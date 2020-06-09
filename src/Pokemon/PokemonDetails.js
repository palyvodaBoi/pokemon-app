import React from 'react';
import { Table } from 'semantic-ui-react';
import styles from './PokemonDetails.module.css';

function PokemonDetails(props) {
  const { sprites, name, id, stats, weight, moves } = props.activeCard;

  return (
    <div className={styles.Details}>

      <div className={styles.DetailsCard}>
        <div className={styles.ImageWrapper}>
          <img src={sprites.front_default} alt={name + ' image'} />
        </div>

        <div>
          <p className={styles.Name}>{ name } #{id.toString().padStart(3, '0')}</p>

          <div className={styles.TableWrapper}>
            <Table className={styles.Table} celled compact textAlign='center'>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Type</Table.HeaderCell>
                  <Table.HeaderCell>Fire</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {stats.map(stat => {
                  if (stat.stat.name ==='hp') stat.stat.name = 'HP';
                  if (stat.stat.name ==='special-attack') stat.stat.name = 'SP Attack';
                  if (stat.stat.name ==='special-defense') stat.stat.name = 'SP Defense';

                  return (
                    <Table.Row key={stat.stat.name}>
                      <Table.Cell>{ stat.stat.name }</Table.Cell>
                      <Table.Cell>{ stat.base_stat }</Table.Cell>
                    </Table.Row>
                  )
                })}
                <Table.Row>
                  <Table.Cell>Weight</Table.Cell>
                  <Table.Cell>{ weight }</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Total Moves</Table.Cell>
                  <Table.Cell>{ moves.length }</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>

        </div>
      </div>
    </div>
  )
}

export default PokemonDetails;