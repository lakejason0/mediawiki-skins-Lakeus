<?php
/**
 * Clean up user preferences from the database.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
 * http://www.gnu.org/copyleft/gpl.html
 *
 * @file
 * @author TyA <tya.wiki@gmail.com>
 * @author Chad <chad@wikimedia.org>
 * @ingroup Maintenance
 */

// @codeCoverageIgnoreStart
require_once MW_INSTALL_PATH . '/maintenance/Maintenance.php';
// @codeCoverageIgnoreEnd

use MediaWiki\Maintenance\Maintenance;
use Wikimedia\Rdbms\IReadableDatabase;

/**
 * Maintenance script that removes unused preferences from the database.
 *
 * @ingroup Maintenance
 */
class MigratePreferences extends Maintenance {
	public function __construct() {
		parent::__construct();
		$this->addDescription( 'Migrate preferences' );
		$this->setBatchSize( 50 );
		$this->addOption( 'dry-run', 'Print debug info instead of actually migrating' );
	}

	public function execute() {
		$dbr = $this->getReplicaDB();
		$legacyPrefs = [
			[
				'up_property' => [
					'legacy' => 'lakeus-theme',
					'current' => 'lakeus-color-scheme',
				],
				'up_values' => [
					[
						'current' => 'os',
					],
					[
						'legacy' => 'day',
						'current' => 'light',
					],
					[
						'legacy' => 'night',
						'current' => 'dark',
					],
				],
			],
		];

		foreach ( $legacyPrefs as $pref ) {
			if ( !isset( $pref['up_property'] ) || !isset( $pref['up_property']['current'] ) ) {
				$this->output( "SKIPPED due to missing 'up_property' in \$legacyPrefs array!\n" );

				continue;
			}

			$legacyProp = isset( $pref['up_property']['legacy'] ) ?
				$pref['up_property']['legacy'] : $pref['up_property']['current'];
			$currentProp = $pref['up_property']['current'];
			$vals = $pref['up_values'];

			if ( isset( $vals ) ) {
				foreach ( $vals as $val ) {
					$legacyVal = isset( $val['legacy'] ) ? $val['legacy'] : $val['current'];
					$currentVal = $val['current'];

					$this->migrateLegacyPref(
						$dbr,
						'Migrating deprecated preferences',
						true,
						$legacyProp,
						$currentProp,
						$legacyVal,
						$currentVal
					);
				}
			} else {
				$this->migrateLegacyPref(
					$dbr,
					'Migrating deprecated preferences',
					false,
					$legacyProp,
					$currentProp
				);
			}
		}
	}

	/**
	 * @param IReadableDatabase $dbr
	 * @param string $startMessage
	 * @param bool $migrateVal
	 * @param string $legacyProp
	 * @param string $currentProp
	 * @param mixed $legacyVal
	 * @param mixed $currentVal
	 */
	private function migrateLegacyPref(
		IReadableDatabase $dbr,
		string $startMessage,
		bool $migrateVal,
		string $legacyProp,
		string $currentProp,
		$legacyVal = null,
		$currentVal = null
	) {
		$this->output( $startMessage . "...\n" );
		$dryRun = $this->hasOption( 'dry-run' );

		$where = [
			'up_property' => $legacyProp,
		];

		if ( $migrateVal ) {
			$where['up_value'] = $legacyVal;
		}

		$iterator = new BatchRowIterator(
			$dbr,
			$dbr->newSelectQueryBuilder()
				->from( 'user_properties' )
				->select( [ 'up_user', 'up_property', 'up_value' ] )
				->where( $where )
				->caller( __METHOD__ ),
			[ 'up_user', 'up_property', 'up_value' ],
			$this->getBatchSize()
		);

		$dbp = $this->getPrimaryDB();
		$total = 0;

		foreach ( $iterator as $batch ) {
			$numRows = count( $batch );
			$total += $numRows;
			// Progress or something
			$this->output( "..doing $numRows entries\n" );

			// Delete our batch, then wait
			$updateWhere = [];

			foreach ( $batch as $row ) {
				if ( $dryRun ) {
					$this->output(
						"    DRY RUN, would migrate: " .
						"[up_user] => '{$row->up_user}' " .
						"[up_property] => '{$row->up_property}' " .
						"[up_value] => '{$row->up_value}'\n" .
						"                        to: " .
						"[up_user] => '{$row->up_user}' " .
						"[up_property] => '{$currentProp}' "
					);

					if ( $migrateVal ) {
						$this->output(
							"[up_value] => '{$currentVal}'"
						);
					} else {
						$this->output(
							"[up_value] => '{$row->up_value}'"
						);
					}

					$this->output(
						"\n"
					);

					continue;
				}

				$updateWhere[$row->up_user][$row->up_property] = true;
			}

			$set = [
				'up_property' => $currentProp,
			];

			if ( $migrateVal ) {
				$set['up_value'] = $currentVal;
			}

			if ( $updateWhere && !$dryRun ) {
				$dbp->newUpdateQueryBuilder()
					->update( 'user_properties' )
					->set( $set )
					->where( $dbp->makeWhereFrom2d( $updateWhere, 'up_user', 'up_property' ) )
					->caller( __METHOD__ )
					->execute();

				$this->waitForReplication();
			}
		}

		$this->output( "DONE! (handled $total entries)\n" );
	}
}

// @codeCoverageIgnoreStart
$maintClass = MigratePreferences::class;

require_once RUN_MAINTENANCE_IF_MAIN;
// @codeCoverageIgnoreEnd
