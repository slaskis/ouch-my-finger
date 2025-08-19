import "graphile-config";

import { makePgService } from "@dataplan/pg/adaptors/pg";
import AmberPreset from "postgraphile/presets/amber";
import { PgV4SimpleSubscriptionsPlugin } from "./subscribe.ts";

// For configuration file details, see: https://postgraphile.org/postgraphile/next/config

const preset: GraphileConfig.Preset = {
  extends: [AmberPreset.default ?? AmberPreset],
  plugins: [PgV4SimpleSubscriptionsPlugin],
  pgServices: [
    makePgService({
      // Database connection string:
      connectionString: process.env.DATABASE_URL,
      superuserConnectionString:
        process.env.SUPERUSER_DATABASE_URL ?? process.env.DATABASE_URL,
      // List of schemas to expose:
      schemas: process.env.DATABASE_SCHEMAS?.split(",") ?? ["public"],
      // Enable LISTEN/NOTIFY:
      pubsub: true,
    }),
  ],
  grafserv: {
    port: 5678,
    websockets: true,
    watch: true,
  },
  grafast: {
    explain: true,
  },
};

export default preset;
