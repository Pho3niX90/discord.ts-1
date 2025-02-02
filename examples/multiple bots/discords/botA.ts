import { Bot, Discord, Slash } from "../../../build/cjs/index.js";
import { CommandInteraction } from "discord.js";

@Discord()
@Bot("botA") // A bot id is crucial
export abstract class AppDiscord {
  @Slash("hello")
  root(interaction: CommandInteraction): void {
    interaction.reply("I am bot A.");
  }
}
