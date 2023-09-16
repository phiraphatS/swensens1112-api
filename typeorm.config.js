module.exports = {
  type: 'sqlite',
  database: 'swensens1112-database.db',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
};