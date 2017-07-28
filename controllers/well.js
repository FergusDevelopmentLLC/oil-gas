const knexConfig = require('../knexfile.js');
const Knex = require('knex');
const knex = Knex(knexConfig[process.env.NODE_ENV || 'development']);

module.exports = {

  getWellsForYear: async (req, res, next) => {

    const year = req.value.params.year;

    // var sql =  " select ";
    //     sql += " wells_0717.gid as id, ";
    //     sql += " ST_AsGeoJSON(wells_0717.geom, 3) as geojson, ";
    //     sql += " well_name, ";
    //     sql += " spud_date, ";
    //     sql += " (date_part('year', wells_0717.spud_date) + cogcc_basin.mean) AS retirement_year, ";
    //     sql += " cogcc_basin.name as basin_name ";
    //     sql += " from wells_0717, cogcc_basin ";
    //     sql += " WHERE ST_Within(wells_0717.geom, cogcc_basin.geom) ";
    //     sql += " AND date_part('year', wells_0717.spud_date) <= " + year;
    //     sql += " AND (date_part('year', wells_0717.spud_date) + cogcc_basin.mean) >= " + year;
    //     //sql += " LIMIT 1; ";

    // var sql =  " SELECT grid.id as id, ST_AsGeoJSON(grid.geom, 3) as geojson, COUNT(wells_0717.*) as well_count ";
    //     sql += " FROM grid ";
    //     sql += " JOIN wells_0717 ON st_contains(grid.geom, wells_0717.geom) ";
    //     sql += " AND date_part('year', wells_0717.spud_date) = " + year;
    //     sql += " GROUP BY grid.id ";
    //     sql += " ORDER BY COUNT(wells_0717.*) desc; ";

    // var sql =  " SELECT grid.id as id, ST_AsGeoJSON(grid.geom, 3) as geojson, COUNT(wells_0717.*) as well_count ";
    //     sql += " FROM grid ";
    //     sql += " JOIN wells_0717 ON st_contains(grid.geom, wells_0717.geom) ";
    //     sql += " JOIN cogcc_basin ON st_contains(cogcc_basin.geom, wells_0717.geom) ";
    //     sql += " AND date_part('year', wells_0717.spud_date) <= " + year;
    //     sql += " AND (date_part('year', wells_0717.spud_date) + cogcc_basin.mean) >= " + year;
    //     sql += " GROUP BY grid.id ";
    //     sql += " ORDER BY COUNT(wells_0717.*) desc; ";
    //
    // const result = await knex.raw(sql);
    //
    // const wells = [];
    // for(var feature in result.rows) {
    //   wells[feature] = result.rows[feature];
    // }
    //
    // var wellsFC = getFeatureCollectionFor(wells);
    // res.status(200).json(wellsFC);

    var sql =  " SELECT year, geojson ";
        sql += " FROM public.wells_hex ";
        sql += " WHERE year = " + year;

    const result = await knex.raw(sql);

    res.write(result.rows[0].geojson);
    res.end();

  }
};



function getFeatureCollectionFor(coll) {

  var features = [];

  for(item in coll) {
    feature = {
      "type": "Feature",
      "geometry": {
        "type": JSON.parse(coll[item].geojson).type,
        "coordinates": JSON.parse(coll[item].geojson).coordinates
      },
      "properties": {
        "id": coll[item]._id,
        "well_count": coll[item].well_count
      }
    };
    features.push(feature);
  }

  var featureCollection = {
    "type": "FeatureCollection",
    "features": features
  };

  return featureCollection;

}
