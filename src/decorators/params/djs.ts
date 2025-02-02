import { ChannelTypes, SlashOptionType } from "../../index.js";
import { ApplicationCommandOptionChoice } from "discord.js";

export interface ApplicationCommandOptionDatax {
  autocomplete?: boolean;
  channelTypes?: ChannelTypes[];
  choices?: ApplicationCommandOptionChoice[];
  description: string;
  maxValue?: number;
  minValue?: number;
  name: string;
  options?: ApplicationCommandOptionDatax[];
  required?: boolean;
  type: SlashOptionType;
}

export interface ApplicationCommandDataX {
  defaultPermission: boolean;
  description: string;
  name: string;
  options: ApplicationCommandOptionDatax[];
  type: string;
}
