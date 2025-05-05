export interface DiscordEmbedField {
  name: string;
  value: string;
  inline?: boolean;
}

export interface DiscordEmbedThumbnail {
  url: string;
}

export interface DiscordEmbedFooter {
  text: string;
}

export interface DiscordEmbed {
  title: string;
  description: string;
  fields?: DiscordEmbedField[];
  thumbnail?: DiscordEmbedThumbnail;
  footer?: DiscordEmbedFooter;
}

export interface DiscordWebhookPayload {
  embeds: DiscordEmbed[];
}
