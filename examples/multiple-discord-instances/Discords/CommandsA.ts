import { Discord, Slash } from "../../../build/cjs/index.js";
import { CommandInteraction } from "discord.js";

@Discord()
export class CommandsA {
  @Slash("hello1")
  hello2(interaction: CommandInteraction): void {
    interaction.reply("Hello 1");
  }
}
