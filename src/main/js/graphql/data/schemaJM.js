import joinMonsterAdapt from 'join-monster-graphql-tools-adapter')
import typeDefs form './typeDefs.graphql';


// tag the types with the extra join monster metadata
joinMonsterAdapt(typeDefs, {
  Query: {
    fields: {
      // add a function to generate the "where condition"


      // add a function to generate the "where condition"
      station: {
        where: (table, args) => `${table}.id = ${args.id}`
      }
    }
  },
  NETMOMUnit: {
    sqlTable: 'SELECT
    un."_key" _key,
    un."_sub" _sub,
    un.id id,
    un."_sub_st" _sub_st,
    un."_sub_dv" _sub_dv,
    un."_sub_kv" _sub_kv,
    un."i__lun" i__lun,
    un."i__bs" i__bs,
    un."i__nd" i__nd,
    un."i__own" i__own,
    un."i__pun" i__pun,
    un."i__wthrzn" i__wthrzn,
    un.gtype gtype,
    un.private private,
    un.wmx wmx
    FROM
    NETMOM_RTNET_EMS.un un',
    uniqueKey: '"_sub"',
    fields: {
      id: {
        sqlColumn: '"_sub"'
        // the column name is assumed to be the same as the field name
      },
      key: {
        sqlColumn: '"_key"'
      },
      name: {
        sqlColumn: 'id'
      },
      isPUN: {
        sqlColumn: 'private'
      },
      ratedMW: {
        sqlColumn: 'wmx'
      },
      type: {
        sqlColumn: 'gtype'
      },
      station: {
        sqlJoin: (NETMOMUnitTable, NETMOMStationTable) => `${NETMOMUnitTable}."_sub_st" = ${NETMOMStationTable}."_sub"`
      },
      dv: {
        sqlJoin: (NETMOMUnitTable, NETMOMDVTable) => `${NETMOMUnitTable}."_sub_dv" = ${NETMOMDVTable}."_sub"`
      },
      kvGroup: {
        sqlJoin: (NETMOMUnitTable, NETMOMKVGroupTable) => `${NETMOMUnitTable}."_sub_kv" = ${NETMOMKVGroupTable}."_sub"`
      },
      weatherZone: {
        sqlJoin: (NETMOMUnitTable, NETMOMWthrZnTable) => `${NETMOMUnitTable}."i__wthrzn" = ${NETMOMWthrZnTable}."_sub"`
      },
      node: {
        sqlJoin: (NETMOMUnitTable, NETMOMNodeTable) => `${NETMOMUnitTable}."i__node" = ${NETMOMNodeTable}."_sub"`
      },
      bus: {
        sqlJoin: (NETMOMUnitTable, NETMOMBusTable) => `${NETMOMUnitTable}."i__bs" = ${NETMOMBusTable}."_sub"`
      },
      DCurve: {
        sqlJoin: (NETMOMUnitTable, NETMOMTableTable) => `${NETMOMUnitTable}."i__tab" = ${NETMOMTableTable}."_sub"`
      },
      logicalUnits: {
        sqlJoin: (NETMOMUnitTable, NETMOMLogicalUnitTable) => `${NETMOMUnitTable}."i__lun" = ${NETMOMLogicalUnitTable}."_sub" OR ${NETMOMUnitTable}."_sub" = ${NETMOMLogicalUnitTable}."i__un"`
      },
      RE: {
        sqlJoin: (NETMOMUnitTable, NETMOMOwnTable) => `${NETMOMUnitTable}."i__own" = ${NETMOMOwnTable}."_sub"`
      }
    }
  },
  NETMOMLogicalUnit: {
    sqlTable: 'SELECT
    lun."_key" _key,
    lun."_sub" _sub,
    lun.id id,
    lun.ccu ccu,
    lun."_sub_st" _sub_st,
    lun."_sub_dv" _sub_dv,
    lun."i__" i__own,
    lun."i__wthrzn" i__wthrzn,
    un.wmx wmx
    FROM
    NETMOM_RTNET_EMS.lun lun',
    uniqueKey: '"_sub"',
    fields: {
      id: {
        sqlColumn: '"_sub"'
        // the column name is assumed to be the same as the field name
      },
      key: {
        sqlColumn: '"_key"'
      },
      name: {
        sqlColumn: 'id'
      },
      isCombinedCycle: {
        sqlColumn: 'ccu'
      },
      station: {
        sqlJoin: (NETMOMLogicalUnitTable, NETMOMStationTable) => `${NETMOMLogicalUnitTable}."_sub_st" = ${NETMOMStationTable}."_sub"`
      },
      dv: {
        sqlJoin: (NETMOMLogicalUnitTable, NETMOMDVTable) => `${NETMOMLogicalUnitTable}."_sub_dv" = ${NETMOMDVTable}."_sub"`
      },
      units: {
        sqlJoin: (NETMOMUnitTable, NETMOMLogicalUnitTable) => `${NETMOMUnitTable}."i__lun" = ${NETMOMLogicalUnitTable}."_sub" OR ${NETMOMUnitTable}."_sub" = ${NETMOMLogicalUnitTable}."i__un"`
      },
      combinedCycleConfigs: {
        sqlJoin: (NETMOMLogicalUnitTable, NETMOMCombinedCycleConfigTable) => `${NETMOMLogicalUnitTable}."_sub" = ${NETMOMCombinedCycleConfigTable}."_sub_lun"`
      }
    }
  },
  GENMOMUnit: {
    sqlTable: 'SELECT
    un."_key" _key,
    un."_sub" _sub,
    un.id id,
    un."p__unit" p__unit,
    un.gtype gtype
    FROM
    GENMOM_RTGEN_EMS.plc un',
    uniqueKey: '"_sub"',
    fields: {
      id: {
        sqlColumn: '"_sub"'
        // the column name is assumed to be the same as the field name
      },
      key: {
        sqlColumn: '"_key"'
      },
      name: {
        sqlColumn: 'id'
      },
      type: {
        sqlColumn: 'gtype'
      },
      logicalUnits: {
        sqlJoin: (GENMOMUnitTable, GENMOMLogicalUnitTable) => `${GENMOMUnitTable}."p__unit" = ${GENMOMLogicalUnitTable}."_sub" OR ${GENMOMUnitTable}."_sub" = ${GENMOMLogicalUnitTable}."p__plc"`
      }
    }
  },
  GENMOMLogicalUnit: {
    sqlTable: 'SELECT
    lun."_key" _key,
    lun."_sub" _sub,
    lun.id id,
    lun."p__plc" p__plc,
    lun."i__qse" i__qse
    FROM
    GENMOM_RTGEN_EMS.unit lun',
    uniqueKey: '"_sub"',
    fields: {
      id: {
        sqlColumn: '"_sub"'
        // the column name is assumed to be the same as the field name
      },
      key: {
        sqlColumn: '"_key"'
      },
      name: {
        sqlColumn: 'id'
      },
      type: {
        sqlColumn: 'gtype'
      },
      qse: {
        sqlJoin: (GENMOMLogicalUnitTable, GENMOMQSETable) => `${GENMOMLogicalUnitTable}."i__qse" = ${GENMOMQSETable}."_sub"`
      },
      units: {
        sqlJoin: (GENMOMUnitTable, GENMOMLogicalUnitTable) => `${GENMOMUnitTable}."p__unit" = ${GENMOMLogicalUnitTable}."_sub" OR ${GENMOMUnitTable}."_sub" = ${GENMOMLogicalUnitTable}."p__plc"`
      }
    }
  },
  GENMOMQSE: {
    sqlTable: 'SELECT
    qse."_key" _key,
    qse."_sub" _sub,
    qse.id id,
    qse.longname longname
    FROM
    GENMOM_RTGEN_EMS.qse qse',
    uniqueKey: '"_sub"',
    fields: {
      id: {
        sqlColumn: '"_sub"'
        // the column name is assumed to be the same as the field name
      },
      key: {
        sqlColumn: '"_key"'
      },
      name: {
        sqlColumn: 'id'
      },
      longName: {
        sqlColumn: 'longname'
      },
      logicalUnits: {
        sqlJoin: (GENMOMLogicalUnitTable, GENMOMQSETable) => `${GENMOMLogicalUnitTable}."i__qse" = ${GENMOMQSETable}."_sub"`
      }
    }
  },
  NETMOMOwn: {
    sqlTable: 'SELECT
    own."_key" _key,
    own."_sub" _sub,
    own.id id,
    own.longname longname
    FROM
    NETMOM_RTNET_EMS.own own',
    uniqueKey: '"_sub"',
    fields: {
      id: {
        sqlColumn: '"_sub"'
        // the column name is assumed to be the same as the field name
      },
      key: {
        sqlColumn: '"_key"'
      },
      name: {
        sqlColumn: 'id'
      },
      longName: {
        sqlColumn: 'longname'
      },
      units: {
        sqlJoin: (NETMOMUnitTable, NETMOMOwnTable) => `${NETMOMUnitTable}."i__own" = ${NETMOMOwnTable}."_sub"`
      }
    }
  },
  NETMOMXfmr: {
    sqlTable: 'SELECT
    xfmr."_key" _key,
    xfmr."_sub" _sub,
    xfmr.id id,
    xfmr."_sub_st" _sub_st,
    xfmr."_sub_dv" _sub_dv,
    FROM
    NETMOM_RTNET_EMS.xfmr xfmr',
    uniqueKey: '"_sub"',
    fields: {
      id: {
        sqlColumn: '"_sub"'
        // the column name is assumed to be the same as the field name
      },
      key: {
        sqlColumn: '"_key"'
      },
      name: {
        sqlColumn: 'id'
      },
      xfs: {
        sqlJoin: (NETMOMXfmrTable, NETMOMXfTable) => `${NETMOMXfTable}."_sub_xfmr" = ${NETMOMXmfrTable}."_sub"`
      }
    }
  },
  NETMOMXf: {
    sqlTable: 'SELECT
    xf."_key" _key,
    xf."_sub" _sub,
    xf.id id,
    xf."_sub_st" _sub_st,
    xf."_sub_dv" _sub_dv,
    xf."i__bs" i__bs,
    xf."i__nd" i__nd,
    xf."z__bs" z__bs,
    xf."z__nd" z__nd,
    xf.kvnom kvnom,
    xf.zkvnom zkvnom,
    xf."i__own" i__own,
    xf.private private
    FROM
    NETMOM_RTNET_EMS.xf xf',
    uniqueKey: '"_sub"',
    fields: {
      id: {
        sqlColumn: '"_sub"'
        // the column name is assumed to be the same as the field name
      },
      key: {
        sqlColumn: '"_key"'
      },
      name: {
        sqlColumn: 'id'
      },
      isPUN: {
        sqlColumn: 'private'
      },
      akVNom: {
        sqlColumn: 'kvnom'
      },
      bkVNom: {
        sqlColumn: 'zkvnom'
      },
      station: {
        sqlJoin: (NETMOMXfTable, NETMOMStationTable) => `${NETMOMXfTable}."_sub_st" = ${NETMOMStationTable}."_sub"`
      },
      dv: {
        sqlJoin: (NETMOMXfTable, NETMOMDVTable) => `${NETMOMXfTable}."_sub_dv" = ${NETMOMDVTable}."_sub"`
      },
      aNode: {
        sqlJoin: (NETMOMXfTable, NETMOMNodeTable) => `${NETMOMXfTable}."i__nd" = ${NETMOMNodeTable}."_sub"`
      },
      bNode: {
        sqlJoin: (NETMOMXfTable, NETMOMNodeTable) => `${NETMOMXfTable}."z__nd" = ${NETMOMNodeTable}."_sub"`
      },
      aBus: {
        sqlJoin: (NETMOMXfTable, NETMOMBusTable) => `${NETMOMXfTable}."i__bs" = ${NETMOMBusTable}."_sub"`
      },
      bBus: {
        sqlJoin: (NETMOMXfTable, NETMOMBusTable) => `${NETMOMXfTable}."z__bs" = ${NETMOMBusTable}."_sub"`
      },
      owner: {
        sqlJoin: (NETMOMXfTable, NETMOMOwnTable) => `${NETMOMXfTable}."i__own" = ${NETMOMOwnTable}."_sub"`
      },
    }
  },
  NETMOMXf2: {
    sqlTable: 'SELECT
    xf2."_key" _key,
    xf2."_sub" _sub,
    xf2.id id,
    xf2."_sub_st" _sub_st,
    xf2."_sub_dv" _sub_dv,
    xf2."_sub_kv" _sub_kv,
    xf2."_sub_nd" _sub_nd,
    xf2."i__xf" i__xf
    FROM
    NETMOM_RTNET_EMS.xf2 xf2',
    uniqueKey: '"_sub"',
    fields: {
      id: {
        sqlColumn: '"_sub"'
        // the column name is assumed to be the same as the field name
      },
      key: {
        sqlColumn: '"_key"'
      },
      name: {
        sqlColumn: 'id'
      },
      station: {
        sqlJoin: (NETMOMXf2Table, NETMOMStationTable) => `${NETMOMXf2Table}."_sub_st" = ${NETMOMStationTable}."_sub"`
      },
      dv: {
        sqlJoin: (NETMOMXf2Table, NETMOMDVTable) => `${NETMOMXf2Table}."_sub_dv" = ${NETMOMDVTable}."_sub"`
      },
      kvGroup: {
        sqlJoin: (NETMOMXf2Table, NETMOMKVGroupTable) => `${NETMOMXf2Table}."_sub_kv" = ${NETMOMKVGroupTable}."_sub"`
      },
      node: {
        sqlJoin: (NETMOMXf2Table, NETMOMNodeTable) => `${NETMOMXf2Table}."_sub_nd" = ${NETMOMNodeTable}."_sub"`
      },
      bus: {
        sqlJoin: (NETMOMXf2Table, NETMOMBusTable) => `${NETMOMXf2Table}."i__bs" = ${NETMOMBusTable}."_sub"`
      },
      DCurve: {
        sqlJoin: (NETMOMXf2Table, NETMOMTableTable) => `${NETMOMXf2Table}."i__tab" = ${NETMOMTableTable}."_sub"`
      },
      logicalUnits: {
        sqlJoin: (NETMOMXf2Table, NETMOMLogicalUnitTable) => `${NETMOMXf2Table}."i__lun" = ${NETMOMLogicalUnitTable}."_sub" OR ${NETMOMXf2Table}."_sub" = ${NETMOMLogicalUnitTable}."i__un"`
      },
      RE: {
        sqlJoin: (NETMOMXf2Table, NETMOMOwnTable) => `${NETMOMXf2Table}."i__own" = ${NETMOMOwnTable}."_sub"`
      }
    }
  },
  NETMOMKVGroup: {
    sqlTable: 'SELECT
    kv."_key" _key,
    kv."_sub" _sub,
    kv.id id,
    kv."_sub_st" _sub_st,
    kv."_sub_dv" _sub_dv,

    kv."i__vl" i__vl,

    FROM
    NETMOM_RTNET_EMS.kv kv',
    uniqueKey: '"_sub"',
    fields: {
      id: {
        sqlColumn: '"_sub"'
        // the column name is assumed to be the same as the field name
      },
      key: {
        sqlColumn: '"_key"'
      },
      kV: {
        sqlColumn: 'id'
      },
      station: {
        sqlJoin: (NETMOMKVGroupTable, NETMOMStationTable) => `${NETMOMKVGroupTable}."_sub_st" = ${NETMOMStationTable}."_sub"`
      },
      dv: {
        sqlJoin: (NETMOMKVGroupTable, NETMOMDVTable) => `${NETMOMKVGroupTable}."_sub_dv" = ${NETMOMDVTable}."_sub"`
      },
      nodes: {
        sqlJoin: (NETMOMKVGroupTable, NETMOMNodeTable) => `${NETMOMKVGroupTable}."_sub" = ${NETMOMNodeTable}."_sub_kv"`
      },
      buses: {
        sqlJoin: (NETMOMKVGroupTable, NETMOMBusTable) => `${NETMOMKVGroupTable}."_sub" = ${NETMOMBusTable}."i__kv"`
      },
      units: {
        sqlJoin: (NETMOMKVGroupTable, NETMOMUnitTable) => `${NETMOMKVGroupTable}."_sub" = ${NETMOMUnitTable}."_sub_kv"`
      },
      xf2s: {
        sqlJoin: (NETMOMKVGroupTable, NETMOMXf2Table) => `${NETMOMKVGroupTable}."_sub" = ${NETMOMXf2Table}."_sub_kv"`
      },
      voltageLevel: {
        sqlJoin: (NETMOMKVGroupTable, NETMOMVoltageLevel) => `${NETMOMKVGroupTable}."i__vl" = ${NETMOMVoltageLevel}."_sub"`
      }

    }
  },
  NETMOMStation: {
    sqlTable: 'SELECT
    st."_key" _key,
    st."_sub" _sub,
    st.id id,
    st."desc", desc,
    st."_sub_dv" _sub_dv,

    FROM
    NETMOM_RTNET_EMS.st st',
    uniqueKey: '"_sub"',
    fields: {
      id: {
        sqlColumn: '"_sub"'
        // the column name is assumed to be the same as the field name
      },
      key: {
        sqlColumn: '"_key"'
      },
      acronym: {
        sqlColumn: 'id'
      },
      name: {
        sqlColumn: '"desc"'
      },
      station: {
        sqlJoin: (NETMOMStationTable, NETMOMStationTable) => `${NETMOMStationTable}."_sub_st" = ${NETMOMStationTable}."_sub"`
      },
      dv: {
        sqlJoin: (NETMOMStationTable, NETMOMDVTable) => `${NETMOMStationTable}."_sub_dv" = ${NETMOMDVTable}."_sub"`
      },
      nodes: {
        sqlJoin: (NETMOMStationTable, NETMOMNodeTable) => `${NETMOMStationTable}."_sub" = ${NETMOMNodeTable}."_sub_st"`
      },
      buses: {
        sqlJoin: (NETMOMStationTable, NETMOMBusTable) => `${NETMOMStationTable}."_sub" = ${NETMOMBusTable}."i__st"`
      },
      units: {
        sqlJoin: (NETMOMStationTable, NETMOMUnitTable) => `${NETMOMStationTable}."_sub" = ${NETMOMUnitTable}."_sub_st"`
      },
      xfs: {
        sqlJoin: (NETMOMStationTable, NETMOMXfTable) => `${NETMOMStationTable}."_sub" = ${NETMOMXfTable}."_sub_st"`
      },
      voltageLevel: {
        sqlJoin: (NETMOMStationTable, NETMOMVoltageLevel) => `${NETMOMStationTable}."i__vl" = ${NETMOMVoltageLevel}."_sub"`
      }

    }
  },
  NETMOMVoltageLevel: {
    sqlTable: 'SELECT
    vl."_key" _key,
    vl."_sub" _sub,
    vl.id id,
    vl.vbase vbase
    FROM
    NETMOM_RTNET_EMS.vl vl',
    uniqueKey: '"_sub"',
    fields: {
      id: {
        sqlColumn: '"_sub"'
        // the column name is assumed to be the same as the field name
      },
      key: {
        sqlColumn: '"_key"'
      },
      name: {
        sqlColumn: 'id'
      },
      kV: {
        sqlColumn: 'vbase'
      }
    }
  }
})

const joinMonster = require('join-monster').default
// node drivers for talking to SQLite
const db = require('odbc')
const { makeExecutableSchema } = require('graphql-tools')


const resolvers = {
  Query: {
    // call joinMonster in the "user" resolver, and all child fields that are tagged with "sqlTable" are handled!
    user(parent, args, ctx, resolveInfo) {
      return joinMonster(resolveInfo, ctx, sql => {
        return db.all(sql)
      }, { dialect: 'odbc' })
    }
  },
  User: {
    // the only field that needs a resolvers, joinMonster hydrates the rest!
    fullName(user) {
      return user.first_name + ' ' + user.last_name
    }
  }
}

const schemaJM = makeExecutableSchema({
  typeDefs,
  resolvers
})
export default schemaJM
