import {
  ArgsOf,
  Client,
  DApplicationCommand,
  DApplicationCommandGroup,
  DApplicationCommandOption,
  DComponentButton,
  DComponentSelectMenu,
  DDiscord,
  DGuard,
  DIService,
  DOn,
  DSimpleCommand,
  DSimpleCommandOption,
  DiscordEvents,
  GuardFunction,
  ISimpleCommandByName,
  Modifier,
} from "../../index.js";
import { Decorator } from "../../decorators/classes/Decorator.js";
import { Method } from "../../decorators/classes/Method.js";
import _ from "lodash";

/**
 * @category Internal
 */
export class MetadataStorage {
  // internal
  private static _isBuilt = false;
  private static _instance: MetadataStorage;
  private _guards: Array<DGuard> = [];
  private _discords: Array<DDiscord> = [];
  private _modifiers: Array<Modifier<Decorator>> = [];

  // events
  private _events: Array<DOn> = [];

  // custom Handlers
  private _buttonComponents: Array<DComponentButton> = [];
  private _selectMenuComponents: Array<DComponentSelectMenu> = [];

  // simple command
  private _simpleCommands: Array<DSimpleCommand> = [];
  private _simpleCommandByName: Array<ISimpleCommandByName> = [];
  private _simpleCommandByPrefix = new Map<string, ISimpleCommandByName[]>();
  private _simpleCommandOptions: Array<DSimpleCommandOption> = [];

  // discord commands
  private _neatApplicationCommandSlash: Array<DApplicationCommand> = [];
  private _applicationCommandSlash: Array<DApplicationCommand> = [];
  private _applicationCommandUser: Array<DApplicationCommand> = [];
  private _applicationCommandMessage: Array<DApplicationCommand> = [];
  private _applicationCommandSlashOption: Array<DApplicationCommandOption> = [];

  // groups
  private _applicationCommandSlashGroups: Array<
    DApplicationCommandGroup<DApplicationCommand>
  > = [];
  private _applicationCommandSlashSubGroups: DApplicationCommandGroup<DApplicationCommandOption>[] =
    [];

  // static getters

  static clear(): void {
    this._instance = new MetadataStorage();
  }

  static get isBuilt(): boolean {
    return this._isBuilt;
  }

  static get instance(): MetadataStorage {
    if (!this._instance) {
      this._instance = new MetadataStorage();
    }
    return this._instance;
  }

  // geters

  get isBuilt(): boolean {
    return MetadataStorage._isBuilt;
  }

  get events(): readonly DOn[] {
    return this._events;
  }

  /**
   * Get the list of used events without duplications
   */
  get usedEvents(): readonly DOn[] {
    return this.events.reduce<DOn[]>((prev, event, index) => {
      const found = this.events.find((event2) => event.event === event2.event);
      const foundIndex = found ? this.events.indexOf(found) : -1;

      if (foundIndex === index || found?.once !== event.once) {
        prev.push(event);
      }

      return prev;
    }, []);
  }

  get discords(): readonly DDiscord[] {
    return this._discords;
  }

  get neatApplicationCommandSlash(): readonly DApplicationCommand[] {
    return this._neatApplicationCommandSlash;
  }

  get applicationCommandSlash(): readonly DApplicationCommand[] {
    return this._applicationCommandSlash;
  }

  get applicationCommandUser(): readonly DApplicationCommand[] {
    return this._applicationCommandUser;
  }

  get applicationCommandMessage(): readonly DApplicationCommand[] {
    return this._applicationCommandMessage;
  }

  get applicationCommandSlashOption(): readonly DApplicationCommandOption[] {
    return this._applicationCommandSlashOption;
  }

  get applicationCommands(): readonly DApplicationCommand[] {
    return [
      ...this.applicationCommandSlash,
      ...this.applicationCommandMessage,
      ...this.applicationCommandUser,
    ];
  }

  get simpleCommandByName(): readonly ISimpleCommandByName[] {
    return this._simpleCommandByName;
  }

  get simpleCommandByPrefix(): Map<string, ISimpleCommandByName[]> {
    return this._simpleCommandByPrefix;
  }

  get simpleCommands(): readonly DSimpleCommand[] {
    return this._simpleCommands;
  }

  get buttonComponents(): readonly DComponentButton[] {
    return this._buttonComponents;
  }

  get selectMenuComponents(): readonly DComponentSelectMenu[] {
    return this._selectMenuComponents;
  }

  get applicationCommandSlashGroups(): readonly DApplicationCommandGroup[] {
    return this._applicationCommandSlashGroups;
  }

  get applicationCommandSlashSubGroups(): readonly DApplicationCommandGroup[] {
    return this._applicationCommandSlashSubGroups;
  }

  private get discordMembers(): readonly Method[] {
    return [
      ...this._applicationCommandSlash,
      ...this._simpleCommands,
      ...this._events,
      ...this._buttonComponents,
      ...this._selectMenuComponents,
    ];
  }

  addModifier<T extends Decorator = Decorator>(modifier: Modifier<T>): void {
    this._modifiers.push(modifier as Modifier<Decorator>);
  }

  addOn(on: DOn): void {
    this._events.push(on);
  }

  addApplicationCommandSlash(slash: DApplicationCommand): void {
    this._applicationCommandSlash.push(slash);
  }

  addApplicationCommandUser(slash: DApplicationCommand): void {
    this._applicationCommandUser.push(slash);
  }

  addApplicationCommandMessage(slash: DApplicationCommand): void {
    this._applicationCommandMessage.push(slash);
  }

  addApplicationCommandSlashOption(option: DApplicationCommandOption): void {
    this._applicationCommandSlashOption.push(option);
  }

  addApplicationCommandSlashGroups(
    group: DApplicationCommandGroup<DApplicationCommand>
  ): void {
    this._applicationCommandSlashGroups.push(group);
  }

  addApplicationCommandSlashSubGroups(
    subGroup: DApplicationCommandGroup<DApplicationCommandOption>
  ): void {
    this._applicationCommandSlashSubGroups.push(subGroup);
  }

  addSimpleCommand(cmd: DSimpleCommand): void {
    this._simpleCommands.push(cmd);
  }

  addSimpleCommandOption(cmdOption: DSimpleCommandOption): void {
    this._simpleCommandOptions.push(cmdOption);
  }

  addComponentButton(button: DComponentButton): void {
    this._buttonComponents.push(button);
  }

  addComponentSelectMenu(selectMenu: DComponentSelectMenu): void {
    this._selectMenuComponents.push(selectMenu);
  }

  addGuard(guard: DGuard): void {
    this._guards.push(guard);
    DIService.instance.addService(guard.classRef);
  }

  addDiscord(discord: DDiscord): void {
    this._discords.push(discord);
    DIService.instance.addService(discord.classRef);
  }

  async build(): Promise<void> {
    // build the instance if not already built
    if (MetadataStorage.isBuilt) {
      return;
    }
    MetadataStorage._isBuilt = true;

    // Link the events with @Discord class instances
    this.discordMembers.forEach((member) => {
      // Find the linked @Discord of an event
      const discord = this._discords.find((instance) => {
        return instance.from === member.from;
      });

      if (!discord) {
        return;
      }

      // You can get the @Discord that wrap a @SimpleCommand/@On by using
      // on.discord or slash.discord
      member.discord = discord;

      if (member instanceof DApplicationCommand) {
        discord.applicationCommands.push(member);
      }

      if (member instanceof DSimpleCommand) {
        discord.simpleCommands.push(member);
      }

      if (member instanceof DOn) {
        discord.events.push(member);
      }

      if (member instanceof DComponentButton) {
        discord.buttons.push(member);
      }

      if (member instanceof DComponentSelectMenu) {
        discord.selectMenus.push(member);
      }
    });

    await Modifier.applyFromModifierListToList(this._modifiers, this._discords);
    await Modifier.applyFromModifierListToList(this._modifiers, this._events);
    await Modifier.applyFromModifierListToList(
      this._modifiers,
      this._applicationCommandSlash
    );
    await Modifier.applyFromModifierListToList(
      this._modifiers,
      this._applicationCommandSlashOption
    );
    await Modifier.applyFromModifierListToList(
      this._modifiers,
      this._applicationCommandMessage
    );
    await Modifier.applyFromModifierListToList(
      this._modifiers,
      this._applicationCommandUser
    );
    await Modifier.applyFromModifierListToList(
      this._modifiers,
      this._simpleCommands
    );
    await Modifier.applyFromModifierListToList(
      this._modifiers,
      this._simpleCommandOptions
    );
    await Modifier.applyFromModifierListToList(
      this._modifiers,
      this._buttonComponents
    );
    await Modifier.applyFromModifierListToList(
      this._modifiers,
      this._selectMenuComponents
    );

    // Set the class level "group" property of all @Slash
    // Cannot achieve it using modifiers
    this._applicationCommandSlashGroups.forEach((group) => {
      this._applicationCommandSlash.forEach((slash) => {
        if (group.from !== slash.from || slash.type !== "CHAT_INPUT") {
          return;
        }

        slash.group = group.name;
      });
    });

    this._neatApplicationCommandSlash = this._applicationCommandSlash;
    this._applicationCommandSlash = this.groupSlashes();

    this._simpleCommands.forEach((cmd) => {
      // Separately map special prefix commands
      if (cmd.prefix) {
        [...cmd.prefix].forEach((pfx) => {
          const cmds = this._simpleCommandByPrefix.get(pfx) ?? [];
          const mapCmd: ISimpleCommandByName[] = [
            { command: cmd, name: cmd.name },
          ];

          cmd.aliases.forEach((al) => {
            mapCmd.push({ command: cmd, name: al });
          });

          mapCmd.forEach((mcmd) => {
            if (_.findIndex(cmds, { name: mcmd.name }) !== -1) {
              throw Error(
                `Duplicate simple command name: ${mcmd.name} (of: ${mcmd.command.name})`
              );
            }
          });

          this._simpleCommandByPrefix.set(
            pfx,
            [...cmds, ...mapCmd].sort((a, b) => b.name.length - a.name.length)
          );
        });
        return;
      }

      // To improve search performance, map all commands together
      if (_.findIndex(this._simpleCommandByName, { name: cmd.name }) !== -1) {
        throw Error(`Duplicate simple command name: ${cmd.name}`);
      }

      this._simpleCommandByName.push({ command: cmd, name: cmd.name });
      cmd.aliases.forEach((al) => {
        if (_.findIndex(this._simpleCommandByName, { name: al }) !== -1) {
          throw Error(
            `Duplicate simple command name: ${al} (alias of command: ${cmd.name})`
          );
        }
        this._simpleCommandByName.push({ command: cmd, name: al });
      });
    });

    // sort simple commands
    this._simpleCommandByName = this._simpleCommandByName.sort(function (a, b) {
      // ASC  -> a.length - b.length
      // DESC -> b.length - a.length
      return b.name.length - a.name.length;
    });
  }

  private groupSlashes() {
    const groupedSlashes: Map<string, DApplicationCommand> = new Map();

    // Create Slashes from class groups that will wraps the commands
    //
    // "name": "permissions",
    // "description": "Get or edit permissions for a user or a role",
    // "options": [
    //    ...comands
    // ]
    //
    this._applicationCommandSlashGroups.forEach((group) => {
      const slashParent = DApplicationCommand.create(
        group.name,
        "CHAT_INPUT",
        group.infos?.description
      ).decorate(group.classRef, group.key, group.method);

      const discord = this._discords.find((instance) => {
        return instance.from === slashParent.from;
      });

      if (!discord) {
        return;
      }

      slashParent.discord = discord;

      slashParent.guilds = [...slashParent.discord.guilds];
      slashParent.botIds = [...slashParent.discord.botIds];
      slashParent.permissions = [
        ...slashParent.permissions,
        ...slashParent.discord.permissions,
      ];
      slashParent.defaultPermission = slashParent.discord.defaultPermission;

      groupedSlashes.set(group.name, slashParent);

      const slashes = this._applicationCommandSlash.filter((slash) => {
        return slash.group === slashParent.name && !slash.subgroup;
      });

      slashes.forEach((slash) => {
        slashParent.options.push(slash.toSubCommand());
      });
    });

    // Create for each subgroup (@SlashGroup on methods) create an SlashOption based on Slash
    //
    // "name": "permissions",
    // "description": "Get or edit permissions for a user or a role",
    // "options": [
    //    {
    //        "name": "user",
    //        "description": "Get or edit permissions for a user",
    //        "type": "SUB_COMMAND_GROUP"
    //        "options": [
    //            ....
    //        ]
    //     }
    // ]
    this._applicationCommandSlashSubGroups.forEach((subGroup) => {
      const option = DApplicationCommandOption.create(
        subGroup.name,
        undefined,
        undefined,
        subGroup.infos?.description,
        undefined,
        undefined,
        undefined,
        undefined,
        "SUB_COMMAND_GROUP"
      ).decorate(subGroup.classRef, subGroup.key, subGroup.method);

      // Get the slashes that are in this subgroup
      const slashes = this._applicationCommandSlash.filter((slash) => {
        return slash.subgroup === option.name;
      });

      // Convert this slashes into options and add it to the option parent
      // this slashes are the node of the options
      //
      // "name": "permissions",
      // "description": "Get or edit permissions for a user or a role",
      // "options": [
      //     {
      //         "name": "user",
      //         "description": "Get or edit permissions for a user",
      //         "type": "SUB_COMMAND_GROUP"
      //         "options": [
      //             {
      //                 "name": "get",
      //                 "description": "Get permissions for a user",
      //                 "type": "SUB_COMMAND"
      //                 "options": [
      //                 ]
      //              }
      //          ]
      //      }
      // ]
      //
      slashes.forEach((slash) => {
        option.options.push(slash.toSubCommand());
      });

      // The the root option to the root Slash command
      const groupSlash = slashes?.[0]?.group
        ? groupedSlashes.get(slashes[0].group)
        : undefined;
      if (groupSlash) {
        groupSlash.options.push(option);
      }
    });

    return [
      ...this._applicationCommandSlash.filter((s) => !s.group && !s.subgroup),
      ...Array.from(groupedSlashes.values()),
    ];
  }

  /**
   * Trigger a discord event
   * @param event The event to trigger
   * @param client The discord.ts client instance
   * @param once Should we execute the event once
   */
  trigger<Event extends DiscordEvents>(
    guards: GuardFunction[],
    event: Event,
    client: Client,
    once = false
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): (...params: ArgsOf<Event>) => Promise<any> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const responses: Array<any> = [];

    const eventsToExecute = this._events.filter((on) => {
      return on.event === event && on.once === once;
    });

    return async (...params: ArgsOf<Event>) => {
      await Promise.all(
        eventsToExecute.map(async (on) => {
          const botIds = on.botIds;
          if (botIds.length && !botIds.includes(client.botId)) {
            return;
          }
          const res = await on.execute(guards, params, client);
          responses.push(res);
        })
      );
      return responses;
    };
  }
}
