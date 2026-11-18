import * as migration_20261014_092540_initial_schema from './20261014_092540_initial_schema'
import * as migration_20261118_020156_editorial_content_model from './20261118_020156_editorial_content_model'

export const migrations = [
  {
    up: migration_20261014_092540_initial_schema.up,
    down: migration_20261014_092540_initial_schema.down,
    name: '20261014_092540_initial_schema',
  },
  {
    up: migration_20261118_020156_editorial_content_model.up,
    down: migration_20261118_020156_editorial_content_model.down,
    name: '20261118_020156_editorial_content_model',
  },
]
