import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`users_sessions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`created_at\` text,
  	\`expires_at\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`users_sessions_order_idx\` ON \`users_sessions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`users_sessions_parent_id_idx\` ON \`users_sessions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`users\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`email\` text NOT NULL,
  	\`reset_password_token\` text,
  	\`reset_password_expiration\` text,
  	\`salt\` text,
  	\`hash\` text,
  	\`reset_password_requested_at\` text,
  	\`login_attempts\` numeric DEFAULT 0,
  	\`lock_until\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`users_updated_at_idx\` ON \`users\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`users_created_at_idx\` ON \`users\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`users_email_idx\` ON \`users\` (\`email\`);`)
  await db.run(sql`CREATE TABLE \`media\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`alt\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric,
  	\`focal_x\` numeric,
  	\`focal_y\` numeric
  );
  `)
  await db.run(sql`CREATE INDEX \`media_updated_at_idx\` ON \`media\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`media_created_at_idx\` ON \`media\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`media_filename_idx\` ON \`media\` (\`filename\`);`)
  await db.run(sql`CREATE TABLE \`articles_details\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`articles\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`articles_details_order_idx\` ON \`articles_details\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`articles_details_parent_id_idx\` ON \`articles_details\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`articles\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`published_at\` text NOT NULL,
  	\`summary\` text,
  	\`body\` text,
  	\`image_id\` integer,
  	\`external_link\` text,
  	\`source_image\` text,
  	\`legacy_id\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`articles_slug_idx\` ON \`articles\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`articles_image_idx\` ON \`articles\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`articles_updated_at_idx\` ON \`articles\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`articles_created_at_idx\` ON \`articles\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`_articles_v_version_details\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_articles_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_articles_v_version_details_order_idx\` ON \`_articles_v_version_details\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_articles_v_version_details_parent_id_idx\` ON \`_articles_v_version_details\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_articles_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_title\` text NOT NULL,
  	\`version_slug\` text NOT NULL,
  	\`version_published_at\` text NOT NULL,
  	\`version_summary\` text,
  	\`version_body\` text,
  	\`version_image_id\` integer,
  	\`version_external_link\` text,
  	\`version_source_image\` text,
  	\`version_legacy_id\` numeric,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`articles\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_articles_v_parent_idx\` ON \`_articles_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_articles_v_version_version_slug_idx\` ON \`_articles_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_articles_v_version_version_image_idx\` ON \`_articles_v\` (\`version_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_articles_v_version_version_updated_at_idx\` ON \`_articles_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_articles_v_version_version_created_at_idx\` ON \`_articles_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_articles_v_created_at_idx\` ON \`_articles_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_articles_v_updated_at_idx\` ON \`_articles_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`videos\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`provider\` text DEFAULT 'youtube' NOT NULL,
  	\`video_id\` text,
  	\`description\` text,
  	\`thumbnail_id\` integer,
  	\`video_src\` text,
  	\`sort_order\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`thumbnail_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`videos_thumbnail_idx\` ON \`videos\` (\`thumbnail_id\`);`)
  await db.run(sql`CREATE INDEX \`videos_updated_at_idx\` ON \`videos\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`videos_created_at_idx\` ON \`videos\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`_videos_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_title\` text NOT NULL,
  	\`version_provider\` text DEFAULT 'youtube' NOT NULL,
  	\`version_video_id\` text,
  	\`version_description\` text,
  	\`version_thumbnail_id\` integer,
  	\`version_video_src\` text,
  	\`version_sort_order\` numeric,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`videos\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_thumbnail_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_videos_v_parent_idx\` ON \`_videos_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_videos_v_version_version_thumbnail_idx\` ON \`_videos_v\` (\`version_thumbnail_id\`);`)
  await db.run(sql`CREATE INDEX \`_videos_v_version_version_updated_at_idx\` ON \`_videos_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_videos_v_version_version_created_at_idx\` ON \`_videos_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_videos_v_created_at_idx\` ON \`_videos_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_videos_v_updated_at_idx\` ON \`_videos_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_kv\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text NOT NULL,
  	\`data\` text NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`payload_kv_key_idx\` ON \`payload_kv\` (\`key\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`global_slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_global_slug_idx\` ON \`payload_locked_documents\` (\`global_slug\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_updated_at_idx\` ON \`payload_locked_documents\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_created_at_idx\` ON \`payload_locked_documents\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`media_id\` integer,
  	\`articles_id\` integer,
  	\`videos_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`articles_id\`) REFERENCES \`articles\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`videos_id\`) REFERENCES \`videos\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_articles_id_idx\` ON \`payload_locked_documents_rels\` (\`articles_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_videos_id_idx\` ON \`payload_locked_documents_rels\` (\`videos_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text,
  	\`value\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_key_idx\` ON \`payload_preferences\` (\`key\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_updated_at_idx\` ON \`payload_preferences\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_created_at_idx\` ON \`payload_preferences\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_preferences\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_order_idx\` ON \`payload_preferences_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_parent_idx\` ON \`payload_preferences_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_path_idx\` ON \`payload_preferences_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_users_id_idx\` ON \`payload_preferences_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_migrations\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`batch\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_migrations_updated_at_idx\` ON \`payload_migrations\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_migrations_created_at_idx\` ON \`payload_migrations\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`site_settings\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`logo_id\` integer,
  	\`site_title\` text NOT NULL,
  	\`copy\` text,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_logo_idx\` ON \`site_settings\` (\`logo_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_settings_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_logo_id\` integer,
  	\`version_site_title\` text NOT NULL,
  	\`version_copy\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`version_logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_version_logo_idx\` ON \`_site_settings_v\` (\`version_logo_id\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_created_at_idx\` ON \`_site_settings_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_updated_at_idx\` ON \`_site_settings_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`home_page_aims\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`emphasis\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_aims_order_idx\` ON \`home_page_aims\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_aims_parent_id_idx\` ON \`home_page_aims\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_page_hero_slides\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`href\` text NOT NULL,
  	\`title\` text NOT NULL,
  	\`description\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_hero_slides_order_idx\` ON \`home_page_hero_slides\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_hero_slides_parent_id_idx\` ON \`home_page_hero_slides\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_page_hero_slides_image_idx\` ON \`home_page_hero_slides\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`home_page_president_kannada\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_president_kannada_order_idx\` ON \`home_page_president_kannada\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_president_kannada_parent_id_idx\` ON \`home_page_president_kannada\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_page_president_english\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_president_english_order_idx\` ON \`home_page_president_english\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_president_english_parent_id_idx\` ON \`home_page_president_english\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_page_major_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`href\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_major_links_order_idx\` ON \`home_page_major_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_major_links_parent_id_idx\` ON \`home_page_major_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_page_great_souls\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`name\` text NOT NULL,
  	\`role\` text,
  	\`description\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_great_souls_order_idx\` ON \`home_page_great_souls\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_great_souls_parent_id_idx\` ON \`home_page_great_souls\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_page_great_souls_image_idx\` ON \`home_page_great_souls\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`home_page_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`alt\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_gallery_order_idx\` ON \`home_page_gallery\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_gallery_parent_id_idx\` ON \`home_page_gallery\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_page_gallery_image_idx\` ON \`home_page_gallery\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`home_page_contact_lines\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page_contact\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_contact_lines_order_idx\` ON \`home_page_contact_lines\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_contact_lines_parent_id_idx\` ON \`home_page_contact_lines\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_page_contact\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_contact_order_idx\` ON \`home_page_contact\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_contact_parent_id_idx\` ON \`home_page_contact\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`site_title\` text NOT NULL,
  	\`description\` text,
  	\`president_image_id\` integer,
  	\`event_title\` text,
  	\`event_name\` text,
  	\`event_bulletin_href\` text,
  	\`email\` text,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`president_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_president_president_image_idx\` ON \`home_page\` (\`president_image_id\`);`)
  await db.run(sql`CREATE TABLE \`_home_page_v_version_aims\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`emphasis\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_home_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_home_page_v_version_aims_order_idx\` ON \`_home_page_v_version_aims\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_version_aims_parent_id_idx\` ON \`_home_page_v_version_aims\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_home_page_v_version_hero_slides\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`href\` text NOT NULL,
  	\`title\` text NOT NULL,
  	\`description\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_home_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_home_page_v_version_hero_slides_order_idx\` ON \`_home_page_v_version_hero_slides\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_version_hero_slides_parent_id_idx\` ON \`_home_page_v_version_hero_slides\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_version_hero_slides_image_idx\` ON \`_home_page_v_version_hero_slides\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_home_page_v_version_president_kannada\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_home_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_home_page_v_version_president_kannada_order_idx\` ON \`_home_page_v_version_president_kannada\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_version_president_kannada_parent_id_idx\` ON \`_home_page_v_version_president_kannada\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_home_page_v_version_president_english\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_home_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_home_page_v_version_president_english_order_idx\` ON \`_home_page_v_version_president_english\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_version_president_english_parent_id_idx\` ON \`_home_page_v_version_president_english\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_home_page_v_version_major_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`href\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_home_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_home_page_v_version_major_links_order_idx\` ON \`_home_page_v_version_major_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_version_major_links_parent_id_idx\` ON \`_home_page_v_version_major_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_home_page_v_version_great_souls\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`name\` text NOT NULL,
  	\`role\` text,
  	\`description\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_home_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_home_page_v_version_great_souls_order_idx\` ON \`_home_page_v_version_great_souls\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_version_great_souls_parent_id_idx\` ON \`_home_page_v_version_great_souls\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_version_great_souls_image_idx\` ON \`_home_page_v_version_great_souls\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_home_page_v_version_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`alt\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_home_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_home_page_v_version_gallery_order_idx\` ON \`_home_page_v_version_gallery\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_version_gallery_parent_id_idx\` ON \`_home_page_v_version_gallery\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_version_gallery_image_idx\` ON \`_home_page_v_version_gallery\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_home_page_v_version_contact_lines\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_home_page_v_version_contact\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_home_page_v_version_contact_lines_order_idx\` ON \`_home_page_v_version_contact_lines\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_version_contact_lines_parent_id_idx\` ON \`_home_page_v_version_contact_lines\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_home_page_v_version_contact\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_home_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_home_page_v_version_contact_order_idx\` ON \`_home_page_v_version_contact\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_version_contact_parent_id_idx\` ON \`_home_page_v_version_contact\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_home_page_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_site_title\` text NOT NULL,
  	\`version_description\` text,
  	\`version_president_image_id\` integer,
  	\`version_event_title\` text,
  	\`version_event_name\` text,
  	\`version_event_bulletin_href\` text,
  	\`version_email\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`version_president_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_home_page_v_version_president_version_president_image_idx\` ON \`_home_page_v\` (\`version_president_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_created_at_idx\` ON \`_home_page_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_updated_at_idx\` ON \`_home_page_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`about_page_under_construction\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`title\` text,
  	\`description\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`about_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`about_page_under_construction_order_idx\` ON \`about_page_under_construction\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`about_page_under_construction_parent_id_idx\` ON \`about_page_under_construction\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`about_page_under_construction_image_idx\` ON \`about_page_under_construction\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`about_page_projects\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`date\` text,
  	\`title\` text NOT NULL,
  	\`description\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`about_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`about_page_projects_order_idx\` ON \`about_page_projects\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`about_page_projects_parent_id_idx\` ON \`about_page_projects\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`about_page_projects_image_idx\` ON \`about_page_projects\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`about_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`introduction\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`_about_page_v_version_under_construction\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`title\` text,
  	\`description\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_about_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_about_page_v_version_under_construction_order_idx\` ON \`_about_page_v_version_under_construction\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_about_page_v_version_under_construction_parent_id_idx\` ON \`_about_page_v_version_under_construction\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_about_page_v_version_under_construction_image_idx\` ON \`_about_page_v_version_under_construction\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_about_page_v_version_projects\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`date\` text,
  	\`title\` text NOT NULL,
  	\`description\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_about_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_about_page_v_version_projects_order_idx\` ON \`_about_page_v_version_projects\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_about_page_v_version_projects_parent_id_idx\` ON \`_about_page_v_version_projects\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_about_page_v_version_projects_image_idx\` ON \`_about_page_v_version_projects\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_about_page_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_title\` text NOT NULL,
  	\`version_introduction\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`_about_page_v_created_at_idx\` ON \`_about_page_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_about_page_v_updated_at_idx\` ON \`_about_page_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`contact_page_head_office\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`contact_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`contact_page_head_office_order_idx\` ON \`contact_page_head_office\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`contact_page_head_office_parent_id_idx\` ON \`contact_page_head_office\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`contact_page_vasavi_dham\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`contact_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`contact_page_vasavi_dham_order_idx\` ON \`contact_page_vasavi_dham\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`contact_page_vasavi_dham_parent_id_idx\` ON \`contact_page_vasavi_dham\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`contact_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`location\` text,
  	\`email\` text,
  	\`phone\` text,
  	\`map_embed\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`_contact_page_v_version_head_office\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_contact_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_contact_page_v_version_head_office_order_idx\` ON \`_contact_page_v_version_head_office\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_contact_page_v_version_head_office_parent_id_idx\` ON \`_contact_page_v_version_head_office\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_contact_page_v_version_vasavi_dham\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_contact_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_contact_page_v_version_vasavi_dham_order_idx\` ON \`_contact_page_v_version_vasavi_dham\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_contact_page_v_version_vasavi_dham_parent_id_idx\` ON \`_contact_page_v_version_vasavi_dham\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_contact_page_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_title\` text NOT NULL,
  	\`version_location\` text,
  	\`version_email\` text,
  	\`version_phone\` text,
  	\`version_map_embed\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`_contact_page_v_created_at_idx\` ON \`_contact_page_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_contact_page_v_updated_at_idx\` ON \`_contact_page_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`donations_page_options\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`key\` text NOT NULL,
  	\`image_id\` integer,
  	\`title\` text NOT NULL,
  	\`description\` text,
  	\`href\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`donations_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`donations_page_options_order_idx\` ON \`donations_page_options\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`donations_page_options_parent_id_idx\` ON \`donations_page_options\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`donations_page_options_image_idx\` ON \`donations_page_options\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`donations_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`intro\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`_donations_page_v_version_options\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text NOT NULL,
  	\`image_id\` integer,
  	\`title\` text NOT NULL,
  	\`description\` text,
  	\`href\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_donations_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_donations_page_v_version_options_order_idx\` ON \`_donations_page_v_version_options\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_donations_page_v_version_options_parent_id_idx\` ON \`_donations_page_v_version_options\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_donations_page_v_version_options_image_idx\` ON \`_donations_page_v_version_options\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_donations_page_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_title\` text NOT NULL,
  	\`version_intro\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`_donations_page_v_created_at_idx\` ON \`_donations_page_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_donations_page_v_updated_at_idx\` ON \`_donations_page_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`donation_annadanam_page_paragraphs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`donation_annadanam_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`donation_annadanam_page_paragraphs_order_idx\` ON \`donation_annadanam_page_paragraphs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`donation_annadanam_page_paragraphs_parent_id_idx\` ON \`donation_annadanam_page_paragraphs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`donation_annadanam_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`eyebrow\` text,
  	\`image_id\` integer,
  	\`form_type\` text,
  	\`highlight\` text,
  	\`section_title\` text,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`donation_annadanam_page_image_idx\` ON \`donation_annadanam_page\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_donation_annadanam_page_v_version_paragraphs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_donation_annadanam_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_donation_annadanam_page_v_version_paragraphs_order_idx\` ON \`_donation_annadanam_page_v_version_paragraphs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_donation_annadanam_page_v_version_paragraphs_parent_id_idx\` ON \`_donation_annadanam_page_v_version_paragraphs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_donation_annadanam_page_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_title\` text NOT NULL,
  	\`version_eyebrow\` text,
  	\`version_image_id\` integer,
  	\`version_form_type\` text,
  	\`version_highlight\` text,
  	\`version_section_title\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`version_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_donation_annadanam_page_v_version_version_image_idx\` ON \`_donation_annadanam_page_v\` (\`version_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_donation_annadanam_page_v_created_at_idx\` ON \`_donation_annadanam_page_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_donation_annadanam_page_v_updated_at_idx\` ON \`_donation_annadanam_page_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`donation_ehundi_page_paragraphs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`donation_ehundi_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`donation_ehundi_page_paragraphs_order_idx\` ON \`donation_ehundi_page_paragraphs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`donation_ehundi_page_paragraphs_parent_id_idx\` ON \`donation_ehundi_page_paragraphs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`donation_ehundi_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`eyebrow\` text,
  	\`image_id\` integer,
  	\`form_type\` text,
  	\`highlight\` text,
  	\`section_title\` text,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`donation_ehundi_page_image_idx\` ON \`donation_ehundi_page\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_donation_ehundi_page_v_version_paragraphs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_donation_ehundi_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_donation_ehundi_page_v_version_paragraphs_order_idx\` ON \`_donation_ehundi_page_v_version_paragraphs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_donation_ehundi_page_v_version_paragraphs_parent_id_idx\` ON \`_donation_ehundi_page_v_version_paragraphs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_donation_ehundi_page_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_title\` text NOT NULL,
  	\`version_eyebrow\` text,
  	\`version_image_id\` integer,
  	\`version_form_type\` text,
  	\`version_highlight\` text,
  	\`version_section_title\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`version_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_donation_ehundi_page_v_version_version_image_idx\` ON \`_donation_ehundi_page_v\` (\`version_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_donation_ehundi_page_v_created_at_idx\` ON \`_donation_ehundi_page_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_donation_ehundi_page_v_updated_at_idx\` ON \`_donation_ehundi_page_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`donation_goshala_page_paragraphs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`donation_goshala_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`donation_goshala_page_paragraphs_order_idx\` ON \`donation_goshala_page_paragraphs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`donation_goshala_page_paragraphs_parent_id_idx\` ON \`donation_goshala_page_paragraphs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`donation_goshala_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`eyebrow\` text,
  	\`image_id\` integer,
  	\`form_type\` text,
  	\`highlight\` text,
  	\`section_title\` text,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`donation_goshala_page_image_idx\` ON \`donation_goshala_page\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_donation_goshala_page_v_version_paragraphs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_donation_goshala_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_donation_goshala_page_v_version_paragraphs_order_idx\` ON \`_donation_goshala_page_v_version_paragraphs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_donation_goshala_page_v_version_paragraphs_parent_id_idx\` ON \`_donation_goshala_page_v_version_paragraphs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_donation_goshala_page_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_title\` text NOT NULL,
  	\`version_eyebrow\` text,
  	\`version_image_id\` integer,
  	\`version_form_type\` text,
  	\`version_highlight\` text,
  	\`version_section_title\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`version_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_donation_goshala_page_v_version_version_image_idx\` ON \`_donation_goshala_page_v\` (\`version_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_donation_goshala_page_v_created_at_idx\` ON \`_donation_goshala_page_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_donation_goshala_page_v_updated_at_idx\` ON \`_donation_goshala_page_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`newsletter_page_documents\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`category\` text,
  	\`description\` text,
  	\`href\` text NOT NULL,
  	\`local\` integer,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`newsletter_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`newsletter_page_documents_order_idx\` ON \`newsletter_page_documents\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`newsletter_page_documents_parent_id_idx\` ON \`newsletter_page_documents\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`newsletter_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`announcement_title\` text,
  	\`announcement_date\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`_newsletter_page_v_version_documents\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`category\` text,
  	\`description\` text,
  	\`href\` text NOT NULL,
  	\`local\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_newsletter_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_newsletter_page_v_version_documents_order_idx\` ON \`_newsletter_page_v_version_documents\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_newsletter_page_v_version_documents_parent_id_idx\` ON \`_newsletter_page_v_version_documents\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_newsletter_page_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_title\` text NOT NULL,
  	\`version_announcement_title\` text,
  	\`version_announcement_date\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`_newsletter_page_v_created_at_idx\` ON \`_newsletter_page_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_newsletter_page_v_updated_at_idx\` ON \`_newsletter_page_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`news_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`_news_page_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_title\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`_news_page_v_created_at_idx\` ON \`_news_page_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_news_page_v_updated_at_idx\` ON \`_news_page_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`overview_page_events\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`date\` text,
  	\`title\` text,
  	\`location\` text,
  	\`description\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`overview_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`overview_page_events_order_idx\` ON \`overview_page_events\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`overview_page_events_parent_id_idx\` ON \`overview_page_events\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`overview_page_events_image_idx\` ON \`overview_page_events\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`overview_page_story_paragraphs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`overview_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`overview_page_story_paragraphs_order_idx\` ON \`overview_page_story_paragraphs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`overview_page_story_paragraphs_parent_id_idx\` ON \`overview_page_story_paragraphs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`overview_page_videos\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`thumbnail_id\` integer,
  	\`title\` text,
  	\`description\` text,
  	\`youtube_embed\` text,
  	\`video_src\` text,
  	FOREIGN KEY (\`thumbnail_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`overview_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`overview_page_videos_order_idx\` ON \`overview_page_videos\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`overview_page_videos_parent_id_idx\` ON \`overview_page_videos\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`overview_page_videos_thumbnail_idx\` ON \`overview_page_videos\` (\`thumbnail_id\`);`)
  await db.run(sql`CREATE TABLE \`overview_page_news\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`title\` text,
  	\`description\` text,
  	\`href\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`overview_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`overview_page_news_order_idx\` ON \`overview_page_news\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`overview_page_news_parent_id_idx\` ON \`overview_page_news\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`overview_page_news_image_idx\` ON \`overview_page_news\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`overview_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`hero_image_id\` integer,
  	\`activity_title\` text,
  	\`activity_donation_href\` text,
  	\`story_eyebrow\` text,
  	\`story_title\` text,
  	\`donation_title\` text,
  	\`donation_image_id\` integer,
  	\`donation_href\` text,
  	\`map_title\` text,
  	\`map_embed\` text,
  	\`map_directions\` text,
  	\`about_title\` text,
  	\`about_image_id\` integer,
  	\`about_text\` text,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`donation_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`about_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`overview_page_hero_image_idx\` ON \`overview_page\` (\`hero_image_id\`);`)
  await db.run(sql`CREATE INDEX \`overview_page_donation_donation_image_idx\` ON \`overview_page\` (\`donation_image_id\`);`)
  await db.run(sql`CREATE INDEX \`overview_page_about_about_image_idx\` ON \`overview_page\` (\`about_image_id\`);`)
  await db.run(sql`CREATE TABLE \`_overview_page_v_version_events\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`date\` text,
  	\`title\` text,
  	\`location\` text,
  	\`description\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_overview_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_overview_page_v_version_events_order_idx\` ON \`_overview_page_v_version_events\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_overview_page_v_version_events_parent_id_idx\` ON \`_overview_page_v_version_events\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_overview_page_v_version_events_image_idx\` ON \`_overview_page_v_version_events\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_overview_page_v_version_story_paragraphs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_overview_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_overview_page_v_version_story_paragraphs_order_idx\` ON \`_overview_page_v_version_story_paragraphs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_overview_page_v_version_story_paragraphs_parent_id_idx\` ON \`_overview_page_v_version_story_paragraphs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_overview_page_v_version_videos\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`thumbnail_id\` integer,
  	\`title\` text,
  	\`description\` text,
  	\`youtube_embed\` text,
  	\`video_src\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`thumbnail_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_overview_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_overview_page_v_version_videos_order_idx\` ON \`_overview_page_v_version_videos\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_overview_page_v_version_videos_parent_id_idx\` ON \`_overview_page_v_version_videos\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_overview_page_v_version_videos_thumbnail_idx\` ON \`_overview_page_v_version_videos\` (\`thumbnail_id\`);`)
  await db.run(sql`CREATE TABLE \`_overview_page_v_version_news\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`title\` text,
  	\`description\` text,
  	\`href\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_overview_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_overview_page_v_version_news_order_idx\` ON \`_overview_page_v_version_news\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_overview_page_v_version_news_parent_id_idx\` ON \`_overview_page_v_version_news\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_overview_page_v_version_news_image_idx\` ON \`_overview_page_v_version_news\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_overview_page_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_title\` text NOT NULL,
  	\`version_hero_image_id\` integer,
  	\`version_activity_title\` text,
  	\`version_activity_donation_href\` text,
  	\`version_story_eyebrow\` text,
  	\`version_story_title\` text,
  	\`version_donation_title\` text,
  	\`version_donation_image_id\` integer,
  	\`version_donation_href\` text,
  	\`version_map_title\` text,
  	\`version_map_embed\` text,
  	\`version_map_directions\` text,
  	\`version_about_title\` text,
  	\`version_about_image_id\` integer,
  	\`version_about_text\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`version_hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_donation_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_about_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_overview_page_v_version_version_hero_image_idx\` ON \`_overview_page_v\` (\`version_hero_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_overview_page_v_version_donation_version_donation_image_idx\` ON \`_overview_page_v\` (\`version_donation_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_overview_page_v_version_about_version_about_image_idx\` ON \`_overview_page_v\` (\`version_about_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_overview_page_v_created_at_idx\` ON \`_overview_page_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_overview_page_v_updated_at_idx\` ON \`_overview_page_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`photos_page_albums\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`photo_count\` numeric DEFAULT 0,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`photos_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`photos_page_albums_order_idx\` ON \`photos_page_albums\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`photos_page_albums_parent_id_idx\` ON \`photos_page_albums\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`photos_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`_photos_page_v_version_albums\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`photo_count\` numeric DEFAULT 0,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_photos_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_photos_page_v_version_albums_order_idx\` ON \`_photos_page_v_version_albums\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_photos_page_v_version_albums_parent_id_idx\` ON \`_photos_page_v_version_albums\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_photos_page_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_title\` text NOT NULL,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`_photos_page_v_created_at_idx\` ON \`_photos_page_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_photos_page_v_updated_at_idx\` ON \`_photos_page_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`privacy_page_sections_paragraphs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`privacy_page_sections\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`privacy_page_sections_paragraphs_order_idx\` ON \`privacy_page_sections_paragraphs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`privacy_page_sections_paragraphs_parent_id_idx\` ON \`privacy_page_sections_paragraphs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`privacy_page_sections\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`privacy_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`privacy_page_sections_order_idx\` ON \`privacy_page_sections\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`privacy_page_sections_parent_id_idx\` ON \`privacy_page_sections\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`privacy_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`intro\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`_privacy_page_v_version_sections_paragraphs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_privacy_page_v_version_sections\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_privacy_page_v_version_sections_paragraphs_order_idx\` ON \`_privacy_page_v_version_sections_paragraphs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_privacy_page_v_version_sections_paragraphs_parent_id_idx\` ON \`_privacy_page_v_version_sections_paragraphs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_privacy_page_v_version_sections\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_privacy_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_privacy_page_v_version_sections_order_idx\` ON \`_privacy_page_v_version_sections\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_privacy_page_v_version_sections_parent_id_idx\` ON \`_privacy_page_v_version_sections\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_privacy_page_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_title\` text NOT NULL,
  	\`version_intro\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`_privacy_page_v_created_at_idx\` ON \`_privacy_page_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_privacy_page_v_updated_at_idx\` ON \`_privacy_page_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`story_page_introduction\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`story_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`story_page_introduction_order_idx\` ON \`story_page_introduction\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`story_page_introduction_parent_id_idx\` ON \`story_page_introduction\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`story_page_historic_events\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`story_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`story_page_historic_events_order_idx\` ON \`story_page_historic_events\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`story_page_historic_events_parent_id_idx\` ON \`story_page_historic_events\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`story_page_narrative\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`text\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`story_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`story_page_narrative_order_idx\` ON \`story_page_narrative\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`story_page_narrative_parent_id_idx\` ON \`story_page_narrative\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`story_page_narrative_image_idx\` ON \`story_page_narrative\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`story_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`cover_image_id\` integer,
  	\`publication_title\` text,
  	\`publication_note\` text,
  	\`publication_href\` text,
  	\`closing\` text,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`cover_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`story_page_cover_image_idx\` ON \`story_page\` (\`cover_image_id\`);`)
  await db.run(sql`CREATE TABLE \`_story_page_v_version_introduction\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_story_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_story_page_v_version_introduction_order_idx\` ON \`_story_page_v_version_introduction\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_story_page_v_version_introduction_parent_id_idx\` ON \`_story_page_v_version_introduction\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_story_page_v_version_historic_events\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_story_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_story_page_v_version_historic_events_order_idx\` ON \`_story_page_v_version_historic_events\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_story_page_v_version_historic_events_parent_id_idx\` ON \`_story_page_v_version_historic_events\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_story_page_v_version_narrative\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_story_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_story_page_v_version_narrative_order_idx\` ON \`_story_page_v_version_narrative\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_story_page_v_version_narrative_parent_id_idx\` ON \`_story_page_v_version_narrative\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_story_page_v_version_narrative_image_idx\` ON \`_story_page_v_version_narrative\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_story_page_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_title\` text NOT NULL,
  	\`version_cover_image_id\` integer,
  	\`version_publication_title\` text,
  	\`version_publication_note\` text,
  	\`version_publication_href\` text,
  	\`version_closing\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`version_cover_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_story_page_v_version_version_cover_image_idx\` ON \`_story_page_v\` (\`version_cover_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_story_page_v_created_at_idx\` ON \`_story_page_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_story_page_v_updated_at_idx\` ON \`_story_page_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`trustees_page_patrons\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`name\` text NOT NULL,
  	\`role\` text,
  	\`description\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`trustees_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`trustees_page_patrons_order_idx\` ON \`trustees_page_patrons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`trustees_page_patrons_parent_id_idx\` ON \`trustees_page_patrons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`trustees_page_patrons_image_idx\` ON \`trustees_page_patrons\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`trustees_page_executive\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`name\` text NOT NULL,
  	\`role\` text,
  	\`description\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`trustees_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`trustees_page_executive_order_idx\` ON \`trustees_page_executive\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`trustees_page_executive_parent_id_idx\` ON \`trustees_page_executive\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`trustees_page_executive_image_idx\` ON \`trustees_page_executive\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`trustees_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`_trustees_page_v_version_patrons\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`name\` text NOT NULL,
  	\`role\` text,
  	\`description\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_trustees_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_trustees_page_v_version_patrons_order_idx\` ON \`_trustees_page_v_version_patrons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_trustees_page_v_version_patrons_parent_id_idx\` ON \`_trustees_page_v_version_patrons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_trustees_page_v_version_patrons_image_idx\` ON \`_trustees_page_v_version_patrons\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_trustees_page_v_version_executive\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`name\` text NOT NULL,
  	\`role\` text,
  	\`description\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_trustees_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_trustees_page_v_version_executive_order_idx\` ON \`_trustees_page_v_version_executive\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_trustees_page_v_version_executive_parent_id_idx\` ON \`_trustees_page_v_version_executive\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_trustees_page_v_version_executive_image_idx\` ON \`_trustees_page_v_version_executive\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_trustees_page_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_title\` text NOT NULL,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`_trustees_page_v_created_at_idx\` ON \`_trustees_page_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_trustees_page_v_updated_at_idx\` ON \`_trustees_page_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`vasavi_dham_page_featured\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`title\` text,
  	\`description\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`vasavi_dham_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`vasavi_dham_page_featured_order_idx\` ON \`vasavi_dham_page_featured\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`vasavi_dham_page_featured_parent_id_idx\` ON \`vasavi_dham_page_featured\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`vasavi_dham_page_featured_image_idx\` ON \`vasavi_dham_page_featured\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`vasavi_dham_page_projects\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`title\` text,
  	\`date\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`vasavi_dham_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`vasavi_dham_page_projects_order_idx\` ON \`vasavi_dham_page_projects\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`vasavi_dham_page_projects_parent_id_idx\` ON \`vasavi_dham_page_projects\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`vasavi_dham_page_projects_image_idx\` ON \`vasavi_dham_page_projects\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`vasavi_dham_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`description\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`_vasavi_dham_page_v_version_featured\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`title\` text,
  	\`description\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_vasavi_dham_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_vasavi_dham_page_v_version_featured_order_idx\` ON \`_vasavi_dham_page_v_version_featured\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_vasavi_dham_page_v_version_featured_parent_id_idx\` ON \`_vasavi_dham_page_v_version_featured\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_vasavi_dham_page_v_version_featured_image_idx\` ON \`_vasavi_dham_page_v_version_featured\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_vasavi_dham_page_v_version_projects\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`title\` text,
  	\`date\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_vasavi_dham_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_vasavi_dham_page_v_version_projects_order_idx\` ON \`_vasavi_dham_page_v_version_projects\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_vasavi_dham_page_v_version_projects_parent_id_idx\` ON \`_vasavi_dham_page_v_version_projects\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_vasavi_dham_page_v_version_projects_image_idx\` ON \`_vasavi_dham_page_v_version_projects\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_vasavi_dham_page_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_title\` text NOT NULL,
  	\`version_description\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`_vasavi_dham_page_v_created_at_idx\` ON \`_vasavi_dham_page_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_vasavi_dham_page_v_updated_at_idx\` ON \`_vasavi_dham_page_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`site_content_home_aims\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`emphasis\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_content_home_aims_order_idx\` ON \`site_content_home_aims\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_content_home_aims_parent_id_idx\` ON \`site_content_home_aims\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_content_home_hero_slides\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`href\` text NOT NULL,
  	\`title\` text NOT NULL,
  	\`description\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_content_home_hero_slides_order_idx\` ON \`site_content_home_hero_slides\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_content_home_hero_slides_parent_id_idx\` ON \`site_content_home_hero_slides\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`site_content_home_hero_slides_image_idx\` ON \`site_content_home_hero_slides\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`site_content_home_president_kannada\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_content_home_president_kannada_order_idx\` ON \`site_content_home_president_kannada\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_content_home_president_kannada_parent_id_idx\` ON \`site_content_home_president_kannada\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_content_home_president_english\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_content_home_president_english_order_idx\` ON \`site_content_home_president_english\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_content_home_president_english_parent_id_idx\` ON \`site_content_home_president_english\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_content_home_major_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`href\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_content_home_major_links_order_idx\` ON \`site_content_home_major_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_content_home_major_links_parent_id_idx\` ON \`site_content_home_major_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_content_home_great_souls\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`name\` text NOT NULL,
  	\`role\` text,
  	\`description\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_content_home_great_souls_order_idx\` ON \`site_content_home_great_souls\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_content_home_great_souls_parent_id_idx\` ON \`site_content_home_great_souls\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`site_content_home_great_souls_image_idx\` ON \`site_content_home_great_souls\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`site_content_home_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`alt\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_content_home_gallery_order_idx\` ON \`site_content_home_gallery\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_content_home_gallery_parent_id_idx\` ON \`site_content_home_gallery\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`site_content_home_gallery_image_idx\` ON \`site_content_home_gallery\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`site_content_home_contact_lines\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_content_home_contact\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_content_home_contact_lines_order_idx\` ON \`site_content_home_contact_lines\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_content_home_contact_lines_parent_id_idx\` ON \`site_content_home_contact_lines\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_content_home_contact\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_content_home_contact_order_idx\` ON \`site_content_home_contact\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_content_home_contact_parent_id_idx\` ON \`site_content_home_contact\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_content_about_under_construction\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`title\` text,
  	\`description\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_content_about_under_construction_order_idx\` ON \`site_content_about_under_construction\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_content_about_under_construction_parent_id_idx\` ON \`site_content_about_under_construction\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`site_content_about_under_construction_image_idx\` ON \`site_content_about_under_construction\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`site_content_about_projects\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`date\` text,
  	\`title\` text NOT NULL,
  	\`description\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_content_about_projects_order_idx\` ON \`site_content_about_projects\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_content_about_projects_parent_id_idx\` ON \`site_content_about_projects\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`site_content_about_projects_image_idx\` ON \`site_content_about_projects\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`site_content_contact_head_office\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_content_contact_head_office_order_idx\` ON \`site_content_contact_head_office\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_content_contact_head_office_parent_id_idx\` ON \`site_content_contact_head_office\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_content_contact_vasavi_dham\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_content_contact_vasavi_dham_order_idx\` ON \`site_content_contact_vasavi_dham\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_content_contact_vasavi_dham_parent_id_idx\` ON \`site_content_contact_vasavi_dham\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_content_donations_options\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`key\` text NOT NULL,
  	\`image_id\` integer,
  	\`title\` text NOT NULL,
  	\`description\` text,
  	\`href\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_content_donations_options_order_idx\` ON \`site_content_donations_options\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_content_donations_options_parent_id_idx\` ON \`site_content_donations_options\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`site_content_donations_options_image_idx\` ON \`site_content_donations_options\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`site_content_donation_pages_annadanam_paragraphs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_content_donation_pages_annadanam_paragraphs_order_idx\` ON \`site_content_donation_pages_annadanam_paragraphs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_content_donation_pages_annadanam_paragraphs_parent_id_idx\` ON \`site_content_donation_pages_annadanam_paragraphs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_content_donation_pages_ehundi_paragraphs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_content_donation_pages_ehundi_paragraphs_order_idx\` ON \`site_content_donation_pages_ehundi_paragraphs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_content_donation_pages_ehundi_paragraphs_parent_id_idx\` ON \`site_content_donation_pages_ehundi_paragraphs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_content_donation_pages_goshala_paragraphs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_content_donation_pages_goshala_paragraphs_order_idx\` ON \`site_content_donation_pages_goshala_paragraphs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_content_donation_pages_goshala_paragraphs_parent_id_idx\` ON \`site_content_donation_pages_goshala_paragraphs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_content_newsletter_documents\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`category\` text,
  	\`description\` text,
  	\`href\` text NOT NULL,
  	\`local\` integer,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_content_newsletter_documents_order_idx\` ON \`site_content_newsletter_documents\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_content_newsletter_documents_parent_id_idx\` ON \`site_content_newsletter_documents\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_content_overview_events\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`date\` text,
  	\`title\` text,
  	\`location\` text,
  	\`description\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_content_overview_events_order_idx\` ON \`site_content_overview_events\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_content_overview_events_parent_id_idx\` ON \`site_content_overview_events\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`site_content_overview_events_image_idx\` ON \`site_content_overview_events\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`site_content_overview_story_paragraphs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_content_overview_story_paragraphs_order_idx\` ON \`site_content_overview_story_paragraphs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_content_overview_story_paragraphs_parent_id_idx\` ON \`site_content_overview_story_paragraphs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_content_overview_videos\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`thumbnail_id\` integer,
  	\`title\` text,
  	\`description\` text,
  	\`youtube_embed\` text,
  	\`video_src\` text,
  	FOREIGN KEY (\`thumbnail_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_content_overview_videos_order_idx\` ON \`site_content_overview_videos\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_content_overview_videos_parent_id_idx\` ON \`site_content_overview_videos\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`site_content_overview_videos_thumbnail_idx\` ON \`site_content_overview_videos\` (\`thumbnail_id\`);`)
  await db.run(sql`CREATE TABLE \`site_content_overview_news\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`title\` text,
  	\`description\` text,
  	\`href\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_content_overview_news_order_idx\` ON \`site_content_overview_news\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_content_overview_news_parent_id_idx\` ON \`site_content_overview_news\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`site_content_overview_news_image_idx\` ON \`site_content_overview_news\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`site_content_photos_albums\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`photo_count\` numeric DEFAULT 0,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_content_photos_albums_order_idx\` ON \`site_content_photos_albums\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_content_photos_albums_parent_id_idx\` ON \`site_content_photos_albums\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_content_privacy_sections_paragraphs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_content_privacy_sections\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_content_privacy_sections_paragraphs_order_idx\` ON \`site_content_privacy_sections_paragraphs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_content_privacy_sections_paragraphs_parent_id_idx\` ON \`site_content_privacy_sections_paragraphs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_content_privacy_sections\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_content_privacy_sections_order_idx\` ON \`site_content_privacy_sections\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_content_privacy_sections_parent_id_idx\` ON \`site_content_privacy_sections\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_content_story_introduction\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_content_story_introduction_order_idx\` ON \`site_content_story_introduction\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_content_story_introduction_parent_id_idx\` ON \`site_content_story_introduction\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_content_story_historic_events\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_content_story_historic_events_order_idx\` ON \`site_content_story_historic_events\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_content_story_historic_events_parent_id_idx\` ON \`site_content_story_historic_events\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_content_story_narrative\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`text\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_content_story_narrative_order_idx\` ON \`site_content_story_narrative\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_content_story_narrative_parent_id_idx\` ON \`site_content_story_narrative\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`site_content_story_narrative_image_idx\` ON \`site_content_story_narrative\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`site_content_trustees_patrons\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`name\` text NOT NULL,
  	\`role\` text,
  	\`description\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_content_trustees_patrons_order_idx\` ON \`site_content_trustees_patrons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_content_trustees_patrons_parent_id_idx\` ON \`site_content_trustees_patrons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`site_content_trustees_patrons_image_idx\` ON \`site_content_trustees_patrons\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`site_content_trustees_executive\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`name\` text NOT NULL,
  	\`role\` text,
  	\`description\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_content_trustees_executive_order_idx\` ON \`site_content_trustees_executive\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_content_trustees_executive_parent_id_idx\` ON \`site_content_trustees_executive\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`site_content_trustees_executive_image_idx\` ON \`site_content_trustees_executive\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`site_content_vasavi_dham_featured\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`title\` text,
  	\`description\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_content_vasavi_dham_featured_order_idx\` ON \`site_content_vasavi_dham_featured\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_content_vasavi_dham_featured_parent_id_idx\` ON \`site_content_vasavi_dham_featured\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`site_content_vasavi_dham_featured_image_idx\` ON \`site_content_vasavi_dham_featured\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`site_content_vasavi_dham_projects\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`title\` text,
  	\`date\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_content_vasavi_dham_projects_order_idx\` ON \`site_content_vasavi_dham_projects\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_content_vasavi_dham_projects_parent_id_idx\` ON \`site_content_vasavi_dham_projects\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`site_content_vasavi_dham_projects_image_idx\` ON \`site_content_vasavi_dham_projects\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`site_content\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`home_site_title\` text NOT NULL,
  	\`home_description\` text,
  	\`home_president_image_id\` integer,
  	\`home_event_title\` text,
  	\`home_event_name\` text,
  	\`home_event_bulletin_href\` text,
  	\`home_email\` text,
  	\`home_updated_at\` text,
  	\`home_created_at\` text,
  	\`about_title\` text NOT NULL,
  	\`about_introduction\` text,
  	\`about_updated_at\` text,
  	\`about_created_at\` text,
  	\`contact_title\` text NOT NULL,
  	\`contact_location\` text,
  	\`contact_email\` text,
  	\`contact_phone\` text,
  	\`contact_map_embed\` text,
  	\`contact_updated_at\` text,
  	\`contact_created_at\` text,
  	\`donations_title\` text NOT NULL,
  	\`donations_intro\` text,
  	\`donations_updated_at\` text,
  	\`donations_created_at\` text,
  	\`donation_pages_annadanam_title\` text NOT NULL,
  	\`donation_pages_annadanam_eyebrow\` text,
  	\`donation_pages_annadanam_image_id\` integer,
  	\`donation_pages_annadanam_form_type\` text,
  	\`donation_pages_annadanam_highlight\` text,
  	\`donation_pages_annadanam_section_title\` text,
  	\`donation_pages_annadanam_updated_at\` text,
  	\`donation_pages_annadanam_created_at\` text,
  	\`donation_pages_ehundi_title\` text NOT NULL,
  	\`donation_pages_ehundi_eyebrow\` text,
  	\`donation_pages_ehundi_image_id\` integer,
  	\`donation_pages_ehundi_form_type\` text,
  	\`donation_pages_ehundi_highlight\` text,
  	\`donation_pages_ehundi_section_title\` text,
  	\`donation_pages_ehundi_updated_at\` text,
  	\`donation_pages_ehundi_created_at\` text,
  	\`donation_pages_goshala_title\` text NOT NULL,
  	\`donation_pages_goshala_eyebrow\` text,
  	\`donation_pages_goshala_image_id\` integer,
  	\`donation_pages_goshala_form_type\` text,
  	\`donation_pages_goshala_highlight\` text,
  	\`donation_pages_goshala_section_title\` text,
  	\`donation_pages_goshala_updated_at\` text,
  	\`donation_pages_goshala_created_at\` text,
  	\`newsletter_title\` text NOT NULL,
  	\`newsletter_announcement_title\` text,
  	\`newsletter_announcement_date\` text,
  	\`newsletter_updated_at\` text,
  	\`newsletter_created_at\` text,
  	\`news_title\` text,
  	\`news_updated_at\` text,
  	\`news_created_at\` text,
  	\`overview_title\` text NOT NULL,
  	\`overview_hero_image_id\` integer,
  	\`overview_activity_title\` text,
  	\`overview_activity_donation_href\` text,
  	\`overview_story_eyebrow\` text,
  	\`overview_story_title\` text,
  	\`overview_donation_title\` text,
  	\`overview_donation_image_id\` integer,
  	\`overview_donation_href\` text,
  	\`overview_map_title\` text,
  	\`overview_map_embed\` text,
  	\`overview_map_directions\` text,
  	\`overview_about_title\` text,
  	\`overview_about_image_id\` integer,
  	\`overview_about_text\` text,
  	\`overview_updated_at\` text,
  	\`overview_created_at\` text,
  	\`photos_title\` text NOT NULL,
  	\`photos_updated_at\` text,
  	\`photos_created_at\` text,
  	\`privacy_title\` text NOT NULL,
  	\`privacy_intro\` text,
  	\`privacy_updated_at\` text,
  	\`privacy_created_at\` text,
  	\`story_title\` text NOT NULL,
  	\`story_cover_image_id\` integer,
  	\`story_publication_title\` text,
  	\`story_publication_note\` text,
  	\`story_publication_href\` text,
  	\`story_closing\` text,
  	\`story_updated_at\` text,
  	\`story_created_at\` text,
  	\`trustees_title\` text NOT NULL,
  	\`trustees_updated_at\` text,
  	\`trustees_created_at\` text,
  	\`vasavi_dham_title\` text NOT NULL,
  	\`vasavi_dham_description\` text,
  	\`vasavi_dham_updated_at\` text,
  	\`vasavi_dham_created_at\` text,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`home_president_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`donation_pages_annadanam_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`donation_pages_ehundi_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`donation_pages_goshala_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`overview_hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`overview_donation_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`overview_about_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`story_cover_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`site_content_home_president_home_president_image_idx\` ON \`site_content\` (\`home_president_image_id\`);`)
  await db.run(sql`CREATE INDEX \`site_content_donation_pages_annadanam_donation_pages_ann_idx\` ON \`site_content\` (\`donation_pages_annadanam_image_id\`);`)
  await db.run(sql`CREATE INDEX \`site_content_donation_pages_ehundi_donation_pages_ehundi_idx\` ON \`site_content\` (\`donation_pages_ehundi_image_id\`);`)
  await db.run(sql`CREATE INDEX \`site_content_donation_pages_goshala_donation_pages_gosha_idx\` ON \`site_content\` (\`donation_pages_goshala_image_id\`);`)
  await db.run(sql`CREATE INDEX \`site_content_overview_overview_hero_image_idx\` ON \`site_content\` (\`overview_hero_image_id\`);`)
  await db.run(sql`CREATE INDEX \`site_content_overview_donation_overview_donation_image_idx\` ON \`site_content\` (\`overview_donation_image_id\`);`)
  await db.run(sql`CREATE INDEX \`site_content_overview_about_overview_about_image_idx\` ON \`site_content\` (\`overview_about_image_id\`);`)
  await db.run(sql`CREATE INDEX \`site_content_story_story_cover_image_idx\` ON \`site_content\` (\`story_cover_image_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_content_v_version_home_aims\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`emphasis\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_content_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_site_content_v_version_home_aims_order_idx\` ON \`_site_content_v_version_home_aims\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_site_content_v_version_home_aims_parent_id_idx\` ON \`_site_content_v_version_home_aims\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_content_v_version_home_hero_slides\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`href\` text NOT NULL,
  	\`title\` text NOT NULL,
  	\`description\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_content_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_site_content_v_version_home_hero_slides_order_idx\` ON \`_site_content_v_version_home_hero_slides\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_site_content_v_version_home_hero_slides_parent_id_idx\` ON \`_site_content_v_version_home_hero_slides\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_site_content_v_version_home_hero_slides_image_idx\` ON \`_site_content_v_version_home_hero_slides\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_content_v_version_home_president_kannada\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_content_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_site_content_v_version_home_president_kannada_order_idx\` ON \`_site_content_v_version_home_president_kannada\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_site_content_v_version_home_president_kannada_parent_id_idx\` ON \`_site_content_v_version_home_president_kannada\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_content_v_version_home_president_english\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_content_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_site_content_v_version_home_president_english_order_idx\` ON \`_site_content_v_version_home_president_english\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_site_content_v_version_home_president_english_parent_id_idx\` ON \`_site_content_v_version_home_president_english\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_content_v_version_home_major_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`href\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_content_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_site_content_v_version_home_major_links_order_idx\` ON \`_site_content_v_version_home_major_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_site_content_v_version_home_major_links_parent_id_idx\` ON \`_site_content_v_version_home_major_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_content_v_version_home_great_souls\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`name\` text NOT NULL,
  	\`role\` text,
  	\`description\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_content_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_site_content_v_version_home_great_souls_order_idx\` ON \`_site_content_v_version_home_great_souls\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_site_content_v_version_home_great_souls_parent_id_idx\` ON \`_site_content_v_version_home_great_souls\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_site_content_v_version_home_great_souls_image_idx\` ON \`_site_content_v_version_home_great_souls\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_content_v_version_home_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`alt\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_content_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_site_content_v_version_home_gallery_order_idx\` ON \`_site_content_v_version_home_gallery\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_site_content_v_version_home_gallery_parent_id_idx\` ON \`_site_content_v_version_home_gallery\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_site_content_v_version_home_gallery_image_idx\` ON \`_site_content_v_version_home_gallery\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_content_v_version_home_contact_lines\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_content_v_version_home_contact\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_site_content_v_version_home_contact_lines_order_idx\` ON \`_site_content_v_version_home_contact_lines\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_site_content_v_version_home_contact_lines_parent_id_idx\` ON \`_site_content_v_version_home_contact_lines\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_content_v_version_home_contact\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_content_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_site_content_v_version_home_contact_order_idx\` ON \`_site_content_v_version_home_contact\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_site_content_v_version_home_contact_parent_id_idx\` ON \`_site_content_v_version_home_contact\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_content_v_version_about_under_construction\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`title\` text,
  	\`description\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_content_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_site_content_v_version_about_under_construction_order_idx\` ON \`_site_content_v_version_about_under_construction\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_site_content_v_version_about_under_construction_parent_id_idx\` ON \`_site_content_v_version_about_under_construction\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_site_content_v_version_about_under_construction_image_idx\` ON \`_site_content_v_version_about_under_construction\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_content_v_version_about_projects\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`date\` text,
  	\`title\` text NOT NULL,
  	\`description\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_content_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_site_content_v_version_about_projects_order_idx\` ON \`_site_content_v_version_about_projects\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_site_content_v_version_about_projects_parent_id_idx\` ON \`_site_content_v_version_about_projects\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_site_content_v_version_about_projects_image_idx\` ON \`_site_content_v_version_about_projects\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_content_v_version_contact_head_office\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_content_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_site_content_v_version_contact_head_office_order_idx\` ON \`_site_content_v_version_contact_head_office\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_site_content_v_version_contact_head_office_parent_id_idx\` ON \`_site_content_v_version_contact_head_office\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_content_v_version_contact_vasavi_dham\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_content_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_site_content_v_version_contact_vasavi_dham_order_idx\` ON \`_site_content_v_version_contact_vasavi_dham\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_site_content_v_version_contact_vasavi_dham_parent_id_idx\` ON \`_site_content_v_version_contact_vasavi_dham\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_content_v_version_donations_options\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text NOT NULL,
  	\`image_id\` integer,
  	\`title\` text NOT NULL,
  	\`description\` text,
  	\`href\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_content_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_site_content_v_version_donations_options_order_idx\` ON \`_site_content_v_version_donations_options\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_site_content_v_version_donations_options_parent_id_idx\` ON \`_site_content_v_version_donations_options\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_site_content_v_version_donations_options_image_idx\` ON \`_site_content_v_version_donations_options\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_content_v_version_donation_pages_annadanam_paragraphs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_content_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_site_content_v_version_donation_pages_annadanam_paragraphs_order_idx\` ON \`_site_content_v_version_donation_pages_annadanam_paragraphs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_site_content_v_version_donation_pages_annadanam_paragraphs_parent_id_idx\` ON \`_site_content_v_version_donation_pages_annadanam_paragraphs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_content_v_version_donation_pages_ehundi_paragraphs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_content_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_site_content_v_version_donation_pages_ehundi_paragraphs_order_idx\` ON \`_site_content_v_version_donation_pages_ehundi_paragraphs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_site_content_v_version_donation_pages_ehundi_paragraphs_parent_id_idx\` ON \`_site_content_v_version_donation_pages_ehundi_paragraphs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_content_v_version_donation_pages_goshala_paragraphs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_content_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_site_content_v_version_donation_pages_goshala_paragraphs_order_idx\` ON \`_site_content_v_version_donation_pages_goshala_paragraphs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_site_content_v_version_donation_pages_goshala_paragraphs_parent_id_idx\` ON \`_site_content_v_version_donation_pages_goshala_paragraphs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_content_v_version_newsletter_documents\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`category\` text,
  	\`description\` text,
  	\`href\` text NOT NULL,
  	\`local\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_content_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_site_content_v_version_newsletter_documents_order_idx\` ON \`_site_content_v_version_newsletter_documents\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_site_content_v_version_newsletter_documents_parent_id_idx\` ON \`_site_content_v_version_newsletter_documents\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_content_v_version_overview_events\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`date\` text,
  	\`title\` text,
  	\`location\` text,
  	\`description\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_content_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_site_content_v_version_overview_events_order_idx\` ON \`_site_content_v_version_overview_events\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_site_content_v_version_overview_events_parent_id_idx\` ON \`_site_content_v_version_overview_events\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_site_content_v_version_overview_events_image_idx\` ON \`_site_content_v_version_overview_events\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_content_v_version_overview_story_paragraphs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_content_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_site_content_v_version_overview_story_paragraphs_order_idx\` ON \`_site_content_v_version_overview_story_paragraphs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_site_content_v_version_overview_story_paragraphs_parent_id_idx\` ON \`_site_content_v_version_overview_story_paragraphs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_content_v_version_overview_videos\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`thumbnail_id\` integer,
  	\`title\` text,
  	\`description\` text,
  	\`youtube_embed\` text,
  	\`video_src\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`thumbnail_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_content_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_site_content_v_version_overview_videos_order_idx\` ON \`_site_content_v_version_overview_videos\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_site_content_v_version_overview_videos_parent_id_idx\` ON \`_site_content_v_version_overview_videos\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_site_content_v_version_overview_videos_thumbnail_idx\` ON \`_site_content_v_version_overview_videos\` (\`thumbnail_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_content_v_version_overview_news\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`title\` text,
  	\`description\` text,
  	\`href\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_content_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_site_content_v_version_overview_news_order_idx\` ON \`_site_content_v_version_overview_news\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_site_content_v_version_overview_news_parent_id_idx\` ON \`_site_content_v_version_overview_news\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_site_content_v_version_overview_news_image_idx\` ON \`_site_content_v_version_overview_news\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_content_v_version_photos_albums\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`photo_count\` numeric DEFAULT 0,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_content_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_site_content_v_version_photos_albums_order_idx\` ON \`_site_content_v_version_photos_albums\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_site_content_v_version_photos_albums_parent_id_idx\` ON \`_site_content_v_version_photos_albums\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_content_v_version_privacy_sections_paragraphs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_content_v_version_privacy_sections\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_site_content_v_version_privacy_sections_paragraphs_order_idx\` ON \`_site_content_v_version_privacy_sections_paragraphs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_site_content_v_version_privacy_sections_paragraphs_parent_id_idx\` ON \`_site_content_v_version_privacy_sections_paragraphs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_content_v_version_privacy_sections\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_content_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_site_content_v_version_privacy_sections_order_idx\` ON \`_site_content_v_version_privacy_sections\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_site_content_v_version_privacy_sections_parent_id_idx\` ON \`_site_content_v_version_privacy_sections\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_content_v_version_story_introduction\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_content_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_site_content_v_version_story_introduction_order_idx\` ON \`_site_content_v_version_story_introduction\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_site_content_v_version_story_introduction_parent_id_idx\` ON \`_site_content_v_version_story_introduction\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_content_v_version_story_historic_events\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_content_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_site_content_v_version_story_historic_events_order_idx\` ON \`_site_content_v_version_story_historic_events\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_site_content_v_version_story_historic_events_parent_id_idx\` ON \`_site_content_v_version_story_historic_events\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_content_v_version_story_narrative\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_content_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_site_content_v_version_story_narrative_order_idx\` ON \`_site_content_v_version_story_narrative\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_site_content_v_version_story_narrative_parent_id_idx\` ON \`_site_content_v_version_story_narrative\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_site_content_v_version_story_narrative_image_idx\` ON \`_site_content_v_version_story_narrative\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_content_v_version_trustees_patrons\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`name\` text NOT NULL,
  	\`role\` text,
  	\`description\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_content_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_site_content_v_version_trustees_patrons_order_idx\` ON \`_site_content_v_version_trustees_patrons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_site_content_v_version_trustees_patrons_parent_id_idx\` ON \`_site_content_v_version_trustees_patrons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_site_content_v_version_trustees_patrons_image_idx\` ON \`_site_content_v_version_trustees_patrons\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_content_v_version_trustees_executive\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`name\` text NOT NULL,
  	\`role\` text,
  	\`description\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_content_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_site_content_v_version_trustees_executive_order_idx\` ON \`_site_content_v_version_trustees_executive\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_site_content_v_version_trustees_executive_parent_id_idx\` ON \`_site_content_v_version_trustees_executive\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_site_content_v_version_trustees_executive_image_idx\` ON \`_site_content_v_version_trustees_executive\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_content_v_version_vasavi_dham_featured\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`title\` text,
  	\`description\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_content_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_site_content_v_version_vasavi_dham_featured_order_idx\` ON \`_site_content_v_version_vasavi_dham_featured\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_site_content_v_version_vasavi_dham_featured_parent_id_idx\` ON \`_site_content_v_version_vasavi_dham_featured\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_site_content_v_version_vasavi_dham_featured_image_idx\` ON \`_site_content_v_version_vasavi_dham_featured\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_content_v_version_vasavi_dham_projects\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`title\` text,
  	\`date\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_content_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_site_content_v_version_vasavi_dham_projects_order_idx\` ON \`_site_content_v_version_vasavi_dham_projects\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_site_content_v_version_vasavi_dham_projects_parent_id_idx\` ON \`_site_content_v_version_vasavi_dham_projects\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_site_content_v_version_vasavi_dham_projects_image_idx\` ON \`_site_content_v_version_vasavi_dham_projects\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_content_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_home_site_title\` text NOT NULL,
  	\`version_home_description\` text,
  	\`version_home_president_image_id\` integer,
  	\`version_home_event_title\` text,
  	\`version_home_event_name\` text,
  	\`version_home_event_bulletin_href\` text,
  	\`version_home_email\` text,
  	\`version_home_updated_at\` text,
  	\`version_home_created_at\` text,
  	\`version_about_title\` text NOT NULL,
  	\`version_about_introduction\` text,
  	\`version_about_updated_at\` text,
  	\`version_about_created_at\` text,
  	\`version_contact_title\` text NOT NULL,
  	\`version_contact_location\` text,
  	\`version_contact_email\` text,
  	\`version_contact_phone\` text,
  	\`version_contact_map_embed\` text,
  	\`version_contact_updated_at\` text,
  	\`version_contact_created_at\` text,
  	\`version_donations_title\` text NOT NULL,
  	\`version_donations_intro\` text,
  	\`version_donations_updated_at\` text,
  	\`version_donations_created_at\` text,
  	\`version_donation_pages_annadanam_title\` text NOT NULL,
  	\`version_donation_pages_annadanam_eyebrow\` text,
  	\`version_donation_pages_annadanam_image_id\` integer,
  	\`version_donation_pages_annadanam_form_type\` text,
  	\`version_donation_pages_annadanam_highlight\` text,
  	\`version_donation_pages_annadanam_section_title\` text,
  	\`version_donation_pages_annadanam_updated_at\` text,
  	\`version_donation_pages_annadanam_created_at\` text,
  	\`version_donation_pages_ehundi_title\` text NOT NULL,
  	\`version_donation_pages_ehundi_eyebrow\` text,
  	\`version_donation_pages_ehundi_image_id\` integer,
  	\`version_donation_pages_ehundi_form_type\` text,
  	\`version_donation_pages_ehundi_highlight\` text,
  	\`version_donation_pages_ehundi_section_title\` text,
  	\`version_donation_pages_ehundi_updated_at\` text,
  	\`version_donation_pages_ehundi_created_at\` text,
  	\`version_donation_pages_goshala_title\` text NOT NULL,
  	\`version_donation_pages_goshala_eyebrow\` text,
  	\`version_donation_pages_goshala_image_id\` integer,
  	\`version_donation_pages_goshala_form_type\` text,
  	\`version_donation_pages_goshala_highlight\` text,
  	\`version_donation_pages_goshala_section_title\` text,
  	\`version_donation_pages_goshala_updated_at\` text,
  	\`version_donation_pages_goshala_created_at\` text,
  	\`version_newsletter_title\` text NOT NULL,
  	\`version_newsletter_announcement_title\` text,
  	\`version_newsletter_announcement_date\` text,
  	\`version_newsletter_updated_at\` text,
  	\`version_newsletter_created_at\` text,
  	\`version_news_title\` text,
  	\`version_news_updated_at\` text,
  	\`version_news_created_at\` text,
  	\`version_overview_title\` text NOT NULL,
  	\`version_overview_hero_image_id\` integer,
  	\`version_overview_activity_title\` text,
  	\`version_overview_activity_donation_href\` text,
  	\`version_overview_story_eyebrow\` text,
  	\`version_overview_story_title\` text,
  	\`version_overview_donation_title\` text,
  	\`version_overview_donation_image_id\` integer,
  	\`version_overview_donation_href\` text,
  	\`version_overview_map_title\` text,
  	\`version_overview_map_embed\` text,
  	\`version_overview_map_directions\` text,
  	\`version_overview_about_title\` text,
  	\`version_overview_about_image_id\` integer,
  	\`version_overview_about_text\` text,
  	\`version_overview_updated_at\` text,
  	\`version_overview_created_at\` text,
  	\`version_photos_title\` text NOT NULL,
  	\`version_photos_updated_at\` text,
  	\`version_photos_created_at\` text,
  	\`version_privacy_title\` text NOT NULL,
  	\`version_privacy_intro\` text,
  	\`version_privacy_updated_at\` text,
  	\`version_privacy_created_at\` text,
  	\`version_story_title\` text NOT NULL,
  	\`version_story_cover_image_id\` integer,
  	\`version_story_publication_title\` text,
  	\`version_story_publication_note\` text,
  	\`version_story_publication_href\` text,
  	\`version_story_closing\` text,
  	\`version_story_updated_at\` text,
  	\`version_story_created_at\` text,
  	\`version_trustees_title\` text NOT NULL,
  	\`version_trustees_updated_at\` text,
  	\`version_trustees_created_at\` text,
  	\`version_vasavi_dham_title\` text NOT NULL,
  	\`version_vasavi_dham_description\` text,
  	\`version_vasavi_dham_updated_at\` text,
  	\`version_vasavi_dham_created_at\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`version_home_president_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_donation_pages_annadanam_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_donation_pages_ehundi_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_donation_pages_goshala_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_overview_hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_overview_donation_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_overview_about_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_story_cover_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_site_content_v_version_home_president_version_home_pres_idx\` ON \`_site_content_v\` (\`version_home_president_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_site_content_v_version_donation_pages_annadanam_version_idx\` ON \`_site_content_v\` (\`version_donation_pages_annadanam_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_site_content_v_version_donation_pages_ehundi_version_do_idx\` ON \`_site_content_v\` (\`version_donation_pages_ehundi_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_site_content_v_version_donation_pages_goshala_version_d_idx\` ON \`_site_content_v\` (\`version_donation_pages_goshala_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_site_content_v_version_overview_version_overview_hero_i_idx\` ON \`_site_content_v\` (\`version_overview_hero_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_site_content_v_version_overview_donation_version_overvi_idx\` ON \`_site_content_v\` (\`version_overview_donation_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_site_content_v_version_overview_about_version_overview__idx\` ON \`_site_content_v\` (\`version_overview_about_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_site_content_v_version_story_version_story_cover_image_idx\` ON \`_site_content_v\` (\`version_story_cover_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_site_content_v_created_at_idx\` ON \`_site_content_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_site_content_v_updated_at_idx\` ON \`_site_content_v\` (\`updated_at\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`users_sessions\`;`)
  await db.run(sql`DROP TABLE \`users\`;`)
  await db.run(sql`DROP TABLE \`media\`;`)
  await db.run(sql`DROP TABLE \`articles_details\`;`)
  await db.run(sql`DROP TABLE \`articles\`;`)
  await db.run(sql`DROP TABLE \`_articles_v_version_details\`;`)
  await db.run(sql`DROP TABLE \`_articles_v\`;`)
  await db.run(sql`DROP TABLE \`videos\`;`)
  await db.run(sql`DROP TABLE \`_videos_v\`;`)
  await db.run(sql`DROP TABLE \`payload_kv\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_migrations\`;`)
  await db.run(sql`DROP TABLE \`site_settings\`;`)
  await db.run(sql`DROP TABLE \`_site_settings_v\`;`)
  await db.run(sql`DROP TABLE \`home_page_aims\`;`)
  await db.run(sql`DROP TABLE \`home_page_hero_slides\`;`)
  await db.run(sql`DROP TABLE \`home_page_president_kannada\`;`)
  await db.run(sql`DROP TABLE \`home_page_president_english\`;`)
  await db.run(sql`DROP TABLE \`home_page_major_links\`;`)
  await db.run(sql`DROP TABLE \`home_page_great_souls\`;`)
  await db.run(sql`DROP TABLE \`home_page_gallery\`;`)
  await db.run(sql`DROP TABLE \`home_page_contact_lines\`;`)
  await db.run(sql`DROP TABLE \`home_page_contact\`;`)
  await db.run(sql`DROP TABLE \`home_page\`;`)
  await db.run(sql`DROP TABLE \`_home_page_v_version_aims\`;`)
  await db.run(sql`DROP TABLE \`_home_page_v_version_hero_slides\`;`)
  await db.run(sql`DROP TABLE \`_home_page_v_version_president_kannada\`;`)
  await db.run(sql`DROP TABLE \`_home_page_v_version_president_english\`;`)
  await db.run(sql`DROP TABLE \`_home_page_v_version_major_links\`;`)
  await db.run(sql`DROP TABLE \`_home_page_v_version_great_souls\`;`)
  await db.run(sql`DROP TABLE \`_home_page_v_version_gallery\`;`)
  await db.run(sql`DROP TABLE \`_home_page_v_version_contact_lines\`;`)
  await db.run(sql`DROP TABLE \`_home_page_v_version_contact\`;`)
  await db.run(sql`DROP TABLE \`_home_page_v\`;`)
  await db.run(sql`DROP TABLE \`about_page_under_construction\`;`)
  await db.run(sql`DROP TABLE \`about_page_projects\`;`)
  await db.run(sql`DROP TABLE \`about_page\`;`)
  await db.run(sql`DROP TABLE \`_about_page_v_version_under_construction\`;`)
  await db.run(sql`DROP TABLE \`_about_page_v_version_projects\`;`)
  await db.run(sql`DROP TABLE \`_about_page_v\`;`)
  await db.run(sql`DROP TABLE \`contact_page_head_office\`;`)
  await db.run(sql`DROP TABLE \`contact_page_vasavi_dham\`;`)
  await db.run(sql`DROP TABLE \`contact_page\`;`)
  await db.run(sql`DROP TABLE \`_contact_page_v_version_head_office\`;`)
  await db.run(sql`DROP TABLE \`_contact_page_v_version_vasavi_dham\`;`)
  await db.run(sql`DROP TABLE \`_contact_page_v\`;`)
  await db.run(sql`DROP TABLE \`donations_page_options\`;`)
  await db.run(sql`DROP TABLE \`donations_page\`;`)
  await db.run(sql`DROP TABLE \`_donations_page_v_version_options\`;`)
  await db.run(sql`DROP TABLE \`_donations_page_v\`;`)
  await db.run(sql`DROP TABLE \`donation_annadanam_page_paragraphs\`;`)
  await db.run(sql`DROP TABLE \`donation_annadanam_page\`;`)
  await db.run(sql`DROP TABLE \`_donation_annadanam_page_v_version_paragraphs\`;`)
  await db.run(sql`DROP TABLE \`_donation_annadanam_page_v\`;`)
  await db.run(sql`DROP TABLE \`donation_ehundi_page_paragraphs\`;`)
  await db.run(sql`DROP TABLE \`donation_ehundi_page\`;`)
  await db.run(sql`DROP TABLE \`_donation_ehundi_page_v_version_paragraphs\`;`)
  await db.run(sql`DROP TABLE \`_donation_ehundi_page_v\`;`)
  await db.run(sql`DROP TABLE \`donation_goshala_page_paragraphs\`;`)
  await db.run(sql`DROP TABLE \`donation_goshala_page\`;`)
  await db.run(sql`DROP TABLE \`_donation_goshala_page_v_version_paragraphs\`;`)
  await db.run(sql`DROP TABLE \`_donation_goshala_page_v\`;`)
  await db.run(sql`DROP TABLE \`newsletter_page_documents\`;`)
  await db.run(sql`DROP TABLE \`newsletter_page\`;`)
  await db.run(sql`DROP TABLE \`_newsletter_page_v_version_documents\`;`)
  await db.run(sql`DROP TABLE \`_newsletter_page_v\`;`)
  await db.run(sql`DROP TABLE \`news_page\`;`)
  await db.run(sql`DROP TABLE \`_news_page_v\`;`)
  await db.run(sql`DROP TABLE \`overview_page_events\`;`)
  await db.run(sql`DROP TABLE \`overview_page_story_paragraphs\`;`)
  await db.run(sql`DROP TABLE \`overview_page_videos\`;`)
  await db.run(sql`DROP TABLE \`overview_page_news\`;`)
  await db.run(sql`DROP TABLE \`overview_page\`;`)
  await db.run(sql`DROP TABLE \`_overview_page_v_version_events\`;`)
  await db.run(sql`DROP TABLE \`_overview_page_v_version_story_paragraphs\`;`)
  await db.run(sql`DROP TABLE \`_overview_page_v_version_videos\`;`)
  await db.run(sql`DROP TABLE \`_overview_page_v_version_news\`;`)
  await db.run(sql`DROP TABLE \`_overview_page_v\`;`)
  await db.run(sql`DROP TABLE \`photos_page_albums\`;`)
  await db.run(sql`DROP TABLE \`photos_page\`;`)
  await db.run(sql`DROP TABLE \`_photos_page_v_version_albums\`;`)
  await db.run(sql`DROP TABLE \`_photos_page_v\`;`)
  await db.run(sql`DROP TABLE \`privacy_page_sections_paragraphs\`;`)
  await db.run(sql`DROP TABLE \`privacy_page_sections\`;`)
  await db.run(sql`DROP TABLE \`privacy_page\`;`)
  await db.run(sql`DROP TABLE \`_privacy_page_v_version_sections_paragraphs\`;`)
  await db.run(sql`DROP TABLE \`_privacy_page_v_version_sections\`;`)
  await db.run(sql`DROP TABLE \`_privacy_page_v\`;`)
  await db.run(sql`DROP TABLE \`story_page_introduction\`;`)
  await db.run(sql`DROP TABLE \`story_page_historic_events\`;`)
  await db.run(sql`DROP TABLE \`story_page_narrative\`;`)
  await db.run(sql`DROP TABLE \`story_page\`;`)
  await db.run(sql`DROP TABLE \`_story_page_v_version_introduction\`;`)
  await db.run(sql`DROP TABLE \`_story_page_v_version_historic_events\`;`)
  await db.run(sql`DROP TABLE \`_story_page_v_version_narrative\`;`)
  await db.run(sql`DROP TABLE \`_story_page_v\`;`)
  await db.run(sql`DROP TABLE \`trustees_page_patrons\`;`)
  await db.run(sql`DROP TABLE \`trustees_page_executive\`;`)
  await db.run(sql`DROP TABLE \`trustees_page\`;`)
  await db.run(sql`DROP TABLE \`_trustees_page_v_version_patrons\`;`)
  await db.run(sql`DROP TABLE \`_trustees_page_v_version_executive\`;`)
  await db.run(sql`DROP TABLE \`_trustees_page_v\`;`)
  await db.run(sql`DROP TABLE \`vasavi_dham_page_featured\`;`)
  await db.run(sql`DROP TABLE \`vasavi_dham_page_projects\`;`)
  await db.run(sql`DROP TABLE \`vasavi_dham_page\`;`)
  await db.run(sql`DROP TABLE \`_vasavi_dham_page_v_version_featured\`;`)
  await db.run(sql`DROP TABLE \`_vasavi_dham_page_v_version_projects\`;`)
  await db.run(sql`DROP TABLE \`_vasavi_dham_page_v\`;`)
  await db.run(sql`DROP TABLE \`site_content_home_aims\`;`)
  await db.run(sql`DROP TABLE \`site_content_home_hero_slides\`;`)
  await db.run(sql`DROP TABLE \`site_content_home_president_kannada\`;`)
  await db.run(sql`DROP TABLE \`site_content_home_president_english\`;`)
  await db.run(sql`DROP TABLE \`site_content_home_major_links\`;`)
  await db.run(sql`DROP TABLE \`site_content_home_great_souls\`;`)
  await db.run(sql`DROP TABLE \`site_content_home_gallery\`;`)
  await db.run(sql`DROP TABLE \`site_content_home_contact_lines\`;`)
  await db.run(sql`DROP TABLE \`site_content_home_contact\`;`)
  await db.run(sql`DROP TABLE \`site_content_about_under_construction\`;`)
  await db.run(sql`DROP TABLE \`site_content_about_projects\`;`)
  await db.run(sql`DROP TABLE \`site_content_contact_head_office\`;`)
  await db.run(sql`DROP TABLE \`site_content_contact_vasavi_dham\`;`)
  await db.run(sql`DROP TABLE \`site_content_donations_options\`;`)
  await db.run(sql`DROP TABLE \`site_content_donation_pages_annadanam_paragraphs\`;`)
  await db.run(sql`DROP TABLE \`site_content_donation_pages_ehundi_paragraphs\`;`)
  await db.run(sql`DROP TABLE \`site_content_donation_pages_goshala_paragraphs\`;`)
  await db.run(sql`DROP TABLE \`site_content_newsletter_documents\`;`)
  await db.run(sql`DROP TABLE \`site_content_overview_events\`;`)
  await db.run(sql`DROP TABLE \`site_content_overview_story_paragraphs\`;`)
  await db.run(sql`DROP TABLE \`site_content_overview_videos\`;`)
  await db.run(sql`DROP TABLE \`site_content_overview_news\`;`)
  await db.run(sql`DROP TABLE \`site_content_photos_albums\`;`)
  await db.run(sql`DROP TABLE \`site_content_privacy_sections_paragraphs\`;`)
  await db.run(sql`DROP TABLE \`site_content_privacy_sections\`;`)
  await db.run(sql`DROP TABLE \`site_content_story_introduction\`;`)
  await db.run(sql`DROP TABLE \`site_content_story_historic_events\`;`)
  await db.run(sql`DROP TABLE \`site_content_story_narrative\`;`)
  await db.run(sql`DROP TABLE \`site_content_trustees_patrons\`;`)
  await db.run(sql`DROP TABLE \`site_content_trustees_executive\`;`)
  await db.run(sql`DROP TABLE \`site_content_vasavi_dham_featured\`;`)
  await db.run(sql`DROP TABLE \`site_content_vasavi_dham_projects\`;`)
  await db.run(sql`DROP TABLE \`site_content\`;`)
  await db.run(sql`DROP TABLE \`_site_content_v_version_home_aims\`;`)
  await db.run(sql`DROP TABLE \`_site_content_v_version_home_hero_slides\`;`)
  await db.run(sql`DROP TABLE \`_site_content_v_version_home_president_kannada\`;`)
  await db.run(sql`DROP TABLE \`_site_content_v_version_home_president_english\`;`)
  await db.run(sql`DROP TABLE \`_site_content_v_version_home_major_links\`;`)
  await db.run(sql`DROP TABLE \`_site_content_v_version_home_great_souls\`;`)
  await db.run(sql`DROP TABLE \`_site_content_v_version_home_gallery\`;`)
  await db.run(sql`DROP TABLE \`_site_content_v_version_home_contact_lines\`;`)
  await db.run(sql`DROP TABLE \`_site_content_v_version_home_contact\`;`)
  await db.run(sql`DROP TABLE \`_site_content_v_version_about_under_construction\`;`)
  await db.run(sql`DROP TABLE \`_site_content_v_version_about_projects\`;`)
  await db.run(sql`DROP TABLE \`_site_content_v_version_contact_head_office\`;`)
  await db.run(sql`DROP TABLE \`_site_content_v_version_contact_vasavi_dham\`;`)
  await db.run(sql`DROP TABLE \`_site_content_v_version_donations_options\`;`)
  await db.run(sql`DROP TABLE \`_site_content_v_version_donation_pages_annadanam_paragraphs\`;`)
  await db.run(sql`DROP TABLE \`_site_content_v_version_donation_pages_ehundi_paragraphs\`;`)
  await db.run(sql`DROP TABLE \`_site_content_v_version_donation_pages_goshala_paragraphs\`;`)
  await db.run(sql`DROP TABLE \`_site_content_v_version_newsletter_documents\`;`)
  await db.run(sql`DROP TABLE \`_site_content_v_version_overview_events\`;`)
  await db.run(sql`DROP TABLE \`_site_content_v_version_overview_story_paragraphs\`;`)
  await db.run(sql`DROP TABLE \`_site_content_v_version_overview_videos\`;`)
  await db.run(sql`DROP TABLE \`_site_content_v_version_overview_news\`;`)
  await db.run(sql`DROP TABLE \`_site_content_v_version_photos_albums\`;`)
  await db.run(sql`DROP TABLE \`_site_content_v_version_privacy_sections_paragraphs\`;`)
  await db.run(sql`DROP TABLE \`_site_content_v_version_privacy_sections\`;`)
  await db.run(sql`DROP TABLE \`_site_content_v_version_story_introduction\`;`)
  await db.run(sql`DROP TABLE \`_site_content_v_version_story_historic_events\`;`)
  await db.run(sql`DROP TABLE \`_site_content_v_version_story_narrative\`;`)
  await db.run(sql`DROP TABLE \`_site_content_v_version_trustees_patrons\`;`)
  await db.run(sql`DROP TABLE \`_site_content_v_version_trustees_executive\`;`)
  await db.run(sql`DROP TABLE \`_site_content_v_version_vasavi_dham_featured\`;`)
  await db.run(sql`DROP TABLE \`_site_content_v_version_vasavi_dham_projects\`;`)
  await db.run(sql`DROP TABLE \`_site_content_v\`;`)
}
