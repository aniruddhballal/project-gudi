import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await applyEditorialSchema(db)
}

// Shared with the explicit upgrade of existing development databases.
export async function applyEditorialSchema(db: Pick<MigrateUpArgs['db'], 'run'>): Promise<void> {
  await db.run(sql`CREATE TABLE \`site_settings_navigation_groups_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`href\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings_navigation_groups\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_navigation_groups_items_order_idx\` ON \`site_settings_navigation_groups_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_navigation_groups_items_parent_id_idx\` ON \`site_settings_navigation_groups_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_navigation_groups\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_navigation_groups_order_idx\` ON \`site_settings_navigation_groups\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_navigation_groups_parent_id_idx\` ON \`site_settings_navigation_groups\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_navigation_quick_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`href\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_navigation_quick_links_order_idx\` ON \`site_settings_navigation_quick_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_navigation_quick_links_parent_id_idx\` ON \`site_settings_navigation_quick_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_settings_v_version_navigation_groups_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`href\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_settings_v_version_navigation_groups\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_navigation_groups_items_order_idx\` ON \`_site_settings_v_version_navigation_groups_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_navigation_groups_items_parent_id_idx\` ON \`_site_settings_v_version_navigation_groups_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_settings_v_version_navigation_groups\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_settings_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_navigation_groups_order_idx\` ON \`_site_settings_v_version_navigation_groups\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_navigation_groups_parent_id_idx\` ON \`_site_settings_v_version_navigation_groups\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_settings_v_version_navigation_quick_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`href\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_settings_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_navigation_quick_links_order_idx\` ON \`_site_settings_v_version_navigation_quick_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_navigation_quick_links_parent_id_idx\` ON \`_site_settings_v_version_navigation_quick_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`photos_page_albums_photos\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`alt\` text,
  	\`caption\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`photos_page_albums\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`photos_page_albums_photos_order_idx\` ON \`photos_page_albums_photos\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`photos_page_albums_photos_parent_id_idx\` ON \`photos_page_albums_photos\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`photos_page_albums_photos_image_idx\` ON \`photos_page_albums_photos\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_photos_page_v_version_albums_photos\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`alt\` text,
  	\`caption\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_photos_page_v_version_albums\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_photos_page_v_version_albums_photos_order_idx\` ON \`_photos_page_v_version_albums_photos\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_photos_page_v_version_albums_photos_parent_id_idx\` ON \`_photos_page_v_version_albums_photos\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_photos_page_v_version_albums_photos_image_idx\` ON \`_photos_page_v_version_albums_photos\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`site_content_photos_albums_photos\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`alt\` text,
  	\`caption\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_content_photos_albums\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_content_photos_albums_photos_order_idx\` ON \`site_content_photos_albums_photos\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_content_photos_albums_photos_parent_id_idx\` ON \`site_content_photos_albums_photos\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`site_content_photos_albums_photos_image_idx\` ON \`site_content_photos_albums_photos\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_content_v_version_photos_albums_photos\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`alt\` text,
  	\`caption\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_content_v_version_photos_albums\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_site_content_v_version_photos_albums_photos_order_idx\` ON \`_site_content_v_version_photos_albums_photos\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_site_content_v_version_photos_albums_photos_parent_id_idx\` ON \`_site_content_v_version_photos_albums_photos\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_site_content_v_version_photos_albums_photos_image_idx\` ON \`_site_content_v_version_photos_albums_photos\` (\`image_id\`);`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_photos_page_albums\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`cover_image_id\` integer,
  	\`cover_alt\` text,
  	\`cover_status\` text,
  	\`photo_count\` numeric DEFAULT 0,
  	FOREIGN KEY (\`cover_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`photos_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_photos_page_albums\`("_order", "_parent_id", "id", "title", "cover_image_id", "cover_alt", "cover_status", "photo_count") SELECT "_order", "_parent_id", "id", "title", NULL, NULL, NULL, "photo_count" FROM \`photos_page_albums\`;`)
  await db.run(sql`DROP TABLE \`photos_page_albums\`;`)
  await db.run(sql`ALTER TABLE \`__new_photos_page_albums\` RENAME TO \`photos_page_albums\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`photos_page_albums_order_idx\` ON \`photos_page_albums\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`photos_page_albums_parent_id_idx\` ON \`photos_page_albums\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`photos_page_albums_cover_image_idx\` ON \`photos_page_albums\` (\`cover_image_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__photos_page_v_version_albums\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`cover_image_id\` integer,
  	\`cover_alt\` text,
  	\`cover_status\` text,
  	\`photo_count\` numeric DEFAULT 0,
  	\`_uuid\` text,
  	FOREIGN KEY (\`cover_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_photos_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__photos_page_v_version_albums\`("_order", "_parent_id", "id", "title", "cover_image_id", "cover_alt", "cover_status", "photo_count", "_uuid") SELECT "_order", "_parent_id", "id", "title", NULL, NULL, NULL, "photo_count", "_uuid" FROM \`_photos_page_v_version_albums\`;`)
  await db.run(sql`DROP TABLE \`_photos_page_v_version_albums\`;`)
  await db.run(sql`ALTER TABLE \`__new__photos_page_v_version_albums\` RENAME TO \`_photos_page_v_version_albums\`;`)
  await db.run(sql`CREATE INDEX \`_photos_page_v_version_albums_order_idx\` ON \`_photos_page_v_version_albums\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_photos_page_v_version_albums_parent_id_idx\` ON \`_photos_page_v_version_albums\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_photos_page_v_version_albums_cover_image_idx\` ON \`_photos_page_v_version_albums\` (\`cover_image_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_site_content_photos_albums\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`cover_image_id\` integer,
  	\`cover_alt\` text,
  	\`cover_status\` text,
  	\`photo_count\` numeric DEFAULT 0,
  	FOREIGN KEY (\`cover_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_site_content_photos_albums\`("_order", "_parent_id", "id", "title", "cover_image_id", "cover_alt", "cover_status", "photo_count") SELECT "_order", "_parent_id", "id", "title", NULL, NULL, NULL, "photo_count" FROM \`site_content_photos_albums\`;`)
  await db.run(sql`DROP TABLE \`site_content_photos_albums\`;`)
  await db.run(sql`ALTER TABLE \`__new_site_content_photos_albums\` RENAME TO \`site_content_photos_albums\`;`)
  await db.run(sql`CREATE INDEX \`site_content_photos_albums_order_idx\` ON \`site_content_photos_albums\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_content_photos_albums_parent_id_idx\` ON \`site_content_photos_albums\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`site_content_photos_albums_cover_image_idx\` ON \`site_content_photos_albums\` (\`cover_image_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__site_content_v_version_photos_albums\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`cover_image_id\` integer,
  	\`cover_alt\` text,
  	\`cover_status\` text,
  	\`photo_count\` numeric DEFAULT 0,
  	\`_uuid\` text,
  	FOREIGN KEY (\`cover_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_content_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__site_content_v_version_photos_albums\`("_order", "_parent_id", "id", "title", "cover_image_id", "cover_alt", "cover_status", "photo_count", "_uuid") SELECT "_order", "_parent_id", "id", "title", NULL, NULL, NULL, "photo_count", "_uuid" FROM \`_site_content_v_version_photos_albums\`;`)
  await db.run(sql`DROP TABLE \`_site_content_v_version_photos_albums\`;`)
  await db.run(sql`ALTER TABLE \`__new__site_content_v_version_photos_albums\` RENAME TO \`_site_content_v_version_photos_albums\`;`)
  await db.run(sql`CREATE INDEX \`_site_content_v_version_photos_albums_order_idx\` ON \`_site_content_v_version_photos_albums\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_site_content_v_version_photos_albums_parent_id_idx\` ON \`_site_content_v_version_photos_albums\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_site_content_v_version_photos_albums_cover_image_idx\` ON \`_site_content_v_version_photos_albums\` (\`cover_image_id\`);`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`content_model_version\` numeric;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`navigation_enabled\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`navigation_home\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`navigation_contact\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`navigation_directory_title\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`navigation_toggle_open_label\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`navigation_toggle_close_label\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`navigation_open_menu\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`navigation_close_menu\` text;`)
  await db.run(sql`ALTER TABLE \`_site_settings_v\` ADD \`version_content_model_version\` numeric;`)
  await db.run(sql`ALTER TABLE \`_site_settings_v\` ADD \`version_navigation_enabled\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`_site_settings_v\` ADD \`version_navigation_home\` text;`)
  await db.run(sql`ALTER TABLE \`_site_settings_v\` ADD \`version_navigation_contact\` text;`)
  await db.run(sql`ALTER TABLE \`_site_settings_v\` ADD \`version_navigation_directory_title\` text;`)
  await db.run(sql`ALTER TABLE \`_site_settings_v\` ADD \`version_navigation_toggle_open_label\` text;`)
  await db.run(sql`ALTER TABLE \`_site_settings_v\` ADD \`version_navigation_toggle_close_label\` text;`)
  await db.run(sql`ALTER TABLE \`_site_settings_v\` ADD \`version_navigation_open_menu\` text;`)
  await db.run(sql`ALTER TABLE \`_site_settings_v\` ADD \`version_navigation_close_menu\` text;`)
  await db.run(sql`ALTER TABLE \`home_page\` ADD \`hero_heading\` text;`)
  await db.run(sql`ALTER TABLE \`_home_page_v\` ADD \`version_hero_heading\` text;`)
  await db.run(sql`ALTER TABLE \`about_page_projects\` ADD \`date_precision\` text;`)
  await db.run(sql`ALTER TABLE \`about_page_projects\` ADD \`year\` numeric;`)
  await db.run(sql`ALTER TABLE \`about_page_projects\` ADD \`month\` numeric;`)
  await db.run(sql`ALTER TABLE \`about_page_projects\` ADD \`day\` numeric;`)
  await db.run(sql`ALTER TABLE \`_about_page_v_version_projects\` ADD \`date_precision\` text;`)
  await db.run(sql`ALTER TABLE \`_about_page_v_version_projects\` ADD \`year\` numeric;`)
  await db.run(sql`ALTER TABLE \`_about_page_v_version_projects\` ADD \`month\` numeric;`)
  await db.run(sql`ALTER TABLE \`_about_page_v_version_projects\` ADD \`day\` numeric;`)
  await db.run(sql`ALTER TABLE \`photos_page\` ADD \`content_model_version\` numeric;`)
  await db.run(sql`ALTER TABLE \`_photos_page_v\` ADD \`version_content_model_version\` numeric;`)
  await db.run(sql`ALTER TABLE \`vasavi_dham_page_projects\` ADD \`date_precision\` text;`)
  await db.run(sql`ALTER TABLE \`vasavi_dham_page_projects\` ADD \`year\` numeric;`)
  await db.run(sql`ALTER TABLE \`vasavi_dham_page_projects\` ADD \`month\` numeric;`)
  await db.run(sql`ALTER TABLE \`vasavi_dham_page_projects\` ADD \`day\` numeric;`)
  await db.run(sql`ALTER TABLE \`_vasavi_dham_page_v_version_projects\` ADD \`date_precision\` text;`)
  await db.run(sql`ALTER TABLE \`_vasavi_dham_page_v_version_projects\` ADD \`year\` numeric;`)
  await db.run(sql`ALTER TABLE \`_vasavi_dham_page_v_version_projects\` ADD \`month\` numeric;`)
  await db.run(sql`ALTER TABLE \`_vasavi_dham_page_v_version_projects\` ADD \`day\` numeric;`)
  await db.run(sql`ALTER TABLE \`site_content_about_projects\` ADD \`date_precision\` text;`)
  await db.run(sql`ALTER TABLE \`site_content_about_projects\` ADD \`year\` numeric;`)
  await db.run(sql`ALTER TABLE \`site_content_about_projects\` ADD \`month\` numeric;`)
  await db.run(sql`ALTER TABLE \`site_content_about_projects\` ADD \`day\` numeric;`)
  await db.run(sql`ALTER TABLE \`site_content_vasavi_dham_projects\` ADD \`date_precision\` text;`)
  await db.run(sql`ALTER TABLE \`site_content_vasavi_dham_projects\` ADD \`year\` numeric;`)
  await db.run(sql`ALTER TABLE \`site_content_vasavi_dham_projects\` ADD \`month\` numeric;`)
  await db.run(sql`ALTER TABLE \`site_content_vasavi_dham_projects\` ADD \`day\` numeric;`)
  await db.run(sql`ALTER TABLE \`site_content\` ADD \`home_hero_heading\` text;`)
  await db.run(sql`ALTER TABLE \`site_content\` ADD \`photos_content_model_version\` numeric;`)
  await db.run(sql`ALTER TABLE \`_site_content_v_version_about_projects\` ADD \`date_precision\` text;`)
  await db.run(sql`ALTER TABLE \`_site_content_v_version_about_projects\` ADD \`year\` numeric;`)
  await db.run(sql`ALTER TABLE \`_site_content_v_version_about_projects\` ADD \`month\` numeric;`)
  await db.run(sql`ALTER TABLE \`_site_content_v_version_about_projects\` ADD \`day\` numeric;`)
  await db.run(sql`ALTER TABLE \`_site_content_v_version_vasavi_dham_projects\` ADD \`date_precision\` text;`)
  await db.run(sql`ALTER TABLE \`_site_content_v_version_vasavi_dham_projects\` ADD \`year\` numeric;`)
  await db.run(sql`ALTER TABLE \`_site_content_v_version_vasavi_dham_projects\` ADD \`month\` numeric;`)
  await db.run(sql`ALTER TABLE \`_site_content_v_version_vasavi_dham_projects\` ADD \`day\` numeric;`)
  await db.run(sql`ALTER TABLE \`_site_content_v\` ADD \`version_home_hero_heading\` text;`)
  await db.run(sql`ALTER TABLE \`_site_content_v\` ADD \`version_photos_content_model_version\` numeric;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`site_settings_navigation_groups_items\`;`)
  await db.run(sql`DROP TABLE \`site_settings_navigation_groups\`;`)
  await db.run(sql`DROP TABLE \`site_settings_navigation_quick_links\`;`)
  await db.run(sql`DROP TABLE \`_site_settings_v_version_navigation_groups_items\`;`)
  await db.run(sql`DROP TABLE \`_site_settings_v_version_navigation_groups\`;`)
  await db.run(sql`DROP TABLE \`_site_settings_v_version_navigation_quick_links\`;`)
  await db.run(sql`DROP TABLE \`photos_page_albums_photos\`;`)
  await db.run(sql`DROP TABLE \`_photos_page_v_version_albums_photos\`;`)
  await db.run(sql`DROP TABLE \`site_content_photos_albums_photos\`;`)
  await db.run(sql`DROP TABLE \`_site_content_v_version_photos_albums_photos\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_photos_page_albums\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`photo_count\` numeric DEFAULT 0,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`photos_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_photos_page_albums\`("_order", "_parent_id", "id", "title", "photo_count") SELECT "_order", "_parent_id", "id", "title", "photo_count" FROM \`photos_page_albums\`;`)
  await db.run(sql`DROP TABLE \`photos_page_albums\`;`)
  await db.run(sql`ALTER TABLE \`__new_photos_page_albums\` RENAME TO \`photos_page_albums\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`photos_page_albums_order_idx\` ON \`photos_page_albums\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`photos_page_albums_parent_id_idx\` ON \`photos_page_albums\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__photos_page_v_version_albums\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`photo_count\` numeric DEFAULT 0,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_photos_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__photos_page_v_version_albums\`("_order", "_parent_id", "id", "title", "photo_count", "_uuid") SELECT "_order", "_parent_id", "id", "title", "photo_count", "_uuid" FROM \`_photos_page_v_version_albums\`;`)
  await db.run(sql`DROP TABLE \`_photos_page_v_version_albums\`;`)
  await db.run(sql`ALTER TABLE \`__new__photos_page_v_version_albums\` RENAME TO \`_photos_page_v_version_albums\`;`)
  await db.run(sql`CREATE INDEX \`_photos_page_v_version_albums_order_idx\` ON \`_photos_page_v_version_albums\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_photos_page_v_version_albums_parent_id_idx\` ON \`_photos_page_v_version_albums\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_site_content_photos_albums\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`photo_count\` numeric DEFAULT 0,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_site_content_photos_albums\`("_order", "_parent_id", "id", "title", "photo_count") SELECT "_order", "_parent_id", "id", "title", "photo_count" FROM \`site_content_photos_albums\`;`)
  await db.run(sql`DROP TABLE \`site_content_photos_albums\`;`)
  await db.run(sql`ALTER TABLE \`__new_site_content_photos_albums\` RENAME TO \`site_content_photos_albums\`;`)
  await db.run(sql`CREATE INDEX \`site_content_photos_albums_order_idx\` ON \`site_content_photos_albums\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_content_photos_albums_parent_id_idx\` ON \`site_content_photos_albums\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__site_content_v_version_photos_albums\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`photo_count\` numeric DEFAULT 0,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_content_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__site_content_v_version_photos_albums\`("_order", "_parent_id", "id", "title", "photo_count", "_uuid") SELECT "_order", "_parent_id", "id", "title", "photo_count", "_uuid" FROM \`_site_content_v_version_photos_albums\`;`)
  await db.run(sql`DROP TABLE \`_site_content_v_version_photos_albums\`;`)
  await db.run(sql`ALTER TABLE \`__new__site_content_v_version_photos_albums\` RENAME TO \`_site_content_v_version_photos_albums\`;`)
  await db.run(sql`CREATE INDEX \`_site_content_v_version_photos_albums_order_idx\` ON \`_site_content_v_version_photos_albums\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_site_content_v_version_photos_albums_parent_id_idx\` ON \`_site_content_v_version_photos_albums\` (\`_parent_id\`);`)
  await db.run(sql`ALTER TABLE \`site_settings\` DROP COLUMN \`content_model_version\`;`)
  await db.run(sql`ALTER TABLE \`site_settings\` DROP COLUMN \`navigation_enabled\`;`)
  await db.run(sql`ALTER TABLE \`site_settings\` DROP COLUMN \`navigation_home\`;`)
  await db.run(sql`ALTER TABLE \`site_settings\` DROP COLUMN \`navigation_contact\`;`)
  await db.run(sql`ALTER TABLE \`site_settings\` DROP COLUMN \`navigation_directory_title\`;`)
  await db.run(sql`ALTER TABLE \`site_settings\` DROP COLUMN \`navigation_toggle_open_label\`;`)
  await db.run(sql`ALTER TABLE \`site_settings\` DROP COLUMN \`navigation_toggle_close_label\`;`)
  await db.run(sql`ALTER TABLE \`site_settings\` DROP COLUMN \`navigation_open_menu\`;`)
  await db.run(sql`ALTER TABLE \`site_settings\` DROP COLUMN \`navigation_close_menu\`;`)
  await db.run(sql`ALTER TABLE \`_site_settings_v\` DROP COLUMN \`version_content_model_version\`;`)
  await db.run(sql`ALTER TABLE \`_site_settings_v\` DROP COLUMN \`version_navigation_enabled\`;`)
  await db.run(sql`ALTER TABLE \`_site_settings_v\` DROP COLUMN \`version_navigation_home\`;`)
  await db.run(sql`ALTER TABLE \`_site_settings_v\` DROP COLUMN \`version_navigation_contact\`;`)
  await db.run(sql`ALTER TABLE \`_site_settings_v\` DROP COLUMN \`version_navigation_directory_title\`;`)
  await db.run(sql`ALTER TABLE \`_site_settings_v\` DROP COLUMN \`version_navigation_toggle_open_label\`;`)
  await db.run(sql`ALTER TABLE \`_site_settings_v\` DROP COLUMN \`version_navigation_toggle_close_label\`;`)
  await db.run(sql`ALTER TABLE \`_site_settings_v\` DROP COLUMN \`version_navigation_open_menu\`;`)
  await db.run(sql`ALTER TABLE \`_site_settings_v\` DROP COLUMN \`version_navigation_close_menu\`;`)
  await db.run(sql`ALTER TABLE \`home_page\` DROP COLUMN \`hero_heading\`;`)
  await db.run(sql`ALTER TABLE \`_home_page_v\` DROP COLUMN \`version_hero_heading\`;`)
  await db.run(sql`ALTER TABLE \`about_page_projects\` DROP COLUMN \`date_precision\`;`)
  await db.run(sql`ALTER TABLE \`about_page_projects\` DROP COLUMN \`year\`;`)
  await db.run(sql`ALTER TABLE \`about_page_projects\` DROP COLUMN \`month\`;`)
  await db.run(sql`ALTER TABLE \`about_page_projects\` DROP COLUMN \`day\`;`)
  await db.run(sql`ALTER TABLE \`_about_page_v_version_projects\` DROP COLUMN \`date_precision\`;`)
  await db.run(sql`ALTER TABLE \`_about_page_v_version_projects\` DROP COLUMN \`year\`;`)
  await db.run(sql`ALTER TABLE \`_about_page_v_version_projects\` DROP COLUMN \`month\`;`)
  await db.run(sql`ALTER TABLE \`_about_page_v_version_projects\` DROP COLUMN \`day\`;`)
  await db.run(sql`ALTER TABLE \`photos_page\` DROP COLUMN \`content_model_version\`;`)
  await db.run(sql`ALTER TABLE \`_photos_page_v\` DROP COLUMN \`version_content_model_version\`;`)
  await db.run(sql`ALTER TABLE \`vasavi_dham_page_projects\` DROP COLUMN \`date_precision\`;`)
  await db.run(sql`ALTER TABLE \`vasavi_dham_page_projects\` DROP COLUMN \`year\`;`)
  await db.run(sql`ALTER TABLE \`vasavi_dham_page_projects\` DROP COLUMN \`month\`;`)
  await db.run(sql`ALTER TABLE \`vasavi_dham_page_projects\` DROP COLUMN \`day\`;`)
  await db.run(sql`ALTER TABLE \`_vasavi_dham_page_v_version_projects\` DROP COLUMN \`date_precision\`;`)
  await db.run(sql`ALTER TABLE \`_vasavi_dham_page_v_version_projects\` DROP COLUMN \`year\`;`)
  await db.run(sql`ALTER TABLE \`_vasavi_dham_page_v_version_projects\` DROP COLUMN \`month\`;`)
  await db.run(sql`ALTER TABLE \`_vasavi_dham_page_v_version_projects\` DROP COLUMN \`day\`;`)
  await db.run(sql`ALTER TABLE \`site_content_about_projects\` DROP COLUMN \`date_precision\`;`)
  await db.run(sql`ALTER TABLE \`site_content_about_projects\` DROP COLUMN \`year\`;`)
  await db.run(sql`ALTER TABLE \`site_content_about_projects\` DROP COLUMN \`month\`;`)
  await db.run(sql`ALTER TABLE \`site_content_about_projects\` DROP COLUMN \`day\`;`)
  await db.run(sql`ALTER TABLE \`site_content_vasavi_dham_projects\` DROP COLUMN \`date_precision\`;`)
  await db.run(sql`ALTER TABLE \`site_content_vasavi_dham_projects\` DROP COLUMN \`year\`;`)
  await db.run(sql`ALTER TABLE \`site_content_vasavi_dham_projects\` DROP COLUMN \`month\`;`)
  await db.run(sql`ALTER TABLE \`site_content_vasavi_dham_projects\` DROP COLUMN \`day\`;`)
  await db.run(sql`ALTER TABLE \`site_content\` DROP COLUMN \`home_hero_heading\`;`)
  await db.run(sql`ALTER TABLE \`site_content\` DROP COLUMN \`photos_content_model_version\`;`)
  await db.run(sql`ALTER TABLE \`_site_content_v_version_about_projects\` DROP COLUMN \`date_precision\`;`)
  await db.run(sql`ALTER TABLE \`_site_content_v_version_about_projects\` DROP COLUMN \`year\`;`)
  await db.run(sql`ALTER TABLE \`_site_content_v_version_about_projects\` DROP COLUMN \`month\`;`)
  await db.run(sql`ALTER TABLE \`_site_content_v_version_about_projects\` DROP COLUMN \`day\`;`)
  await db.run(sql`ALTER TABLE \`_site_content_v_version_vasavi_dham_projects\` DROP COLUMN \`date_precision\`;`)
  await db.run(sql`ALTER TABLE \`_site_content_v_version_vasavi_dham_projects\` DROP COLUMN \`year\`;`)
  await db.run(sql`ALTER TABLE \`_site_content_v_version_vasavi_dham_projects\` DROP COLUMN \`month\`;`)
  await db.run(sql`ALTER TABLE \`_site_content_v_version_vasavi_dham_projects\` DROP COLUMN \`day\`;`)
  await db.run(sql`ALTER TABLE \`_site_content_v\` DROP COLUMN \`version_home_hero_heading\`;`)
  await db.run(sql`ALTER TABLE \`_site_content_v\` DROP COLUMN \`version_photos_content_model_version\`;`)
}
