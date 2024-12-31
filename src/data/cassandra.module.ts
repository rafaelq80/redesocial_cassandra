// cassandra.module.ts
import { Module } from '@nestjs/common';
import { Client } from 'cassandra-driver';

const cassandraClient = new Client({
  contactPoints: ['127.0.0.1'], // Substitua pelo IP do seu Cassandra
  localDataCenter: 'datacenter1', // DataCenter do Cassandra
  keyspace: 'rede_social',       // Nome do Keyspace
});

@Module({
  providers: [
    {
      provide: 'CASSANDRA_CLIENT',
      useValue: cassandraClient,
    },
  ],
  exports: ['CASSANDRA_CLIENT'],
})
export class CassandraModule {}
