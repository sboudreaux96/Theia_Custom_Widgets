import { injectable } from 'inversify';
import { MenuModelRegistry } from '@theia/core';
import { GettingStarted2Widget } from './GettingStarted2-widget';
import { AbstractViewContribution, FrontendApplication } from '@theia/core/lib/browser';
import { Command, CommandRegistry } from '@theia/core/lib/common/command';
import { inject, postConstruct } from '@theia/core/shared/inversify';
import { FrontendApplicationStateService } from '@theia/core/lib/browser/frontend-application-state';

export const GettingStarted2Command: Command = { id: 'GettingStarted2:command' };

@injectable()
export class GettingStarted2Contribution extends AbstractViewContribution<GettingStarted2Widget> {

    @inject(FrontendApplicationStateService)
    protected readonly stateService: FrontendApplicationStateService;
    /**
     * `AbstractViewContribution` handles the creation and registering
     *  of the widget including commands, menus, and keybindings.
     * 
     * We can pass `defaultWidgetOptions` which define widget properties such as 
     * its location `area` (`main`, `left`, `right`, `bottom`), `mode`, and `ref`.
     * 
     */
    constructor() {
        super({
            widgetId: GettingStarted2Widget.ID,
            widgetName: GettingStarted2Widget.LABEL,
            defaultWidgetOptions: { area: 'right' },
            toggleCommandId: GettingStarted2Command.id
        });
    }

    @postConstruct()
async initializeLayout(app: FrontendApplication): Promise<void>{
    await this.openView({activate: false});
}

async onStart(app: FrontendApplication): Promise<void>{
    this.stateService.reachedState('ready').then(
        () => this.openView({ reveal: true })
    );
}

    /**
     * Example command registration to open the widget from the menu, and quick-open.
     * For a simpler use case, it is possible to simply call:
     ```ts
        super.registerCommands(commands)
     ```
     *
     * For more flexibility, we can pass `OpenViewArguments` which define 
     * options on how to handle opening the widget:
     * 
     ```ts
        toggle?: boolean
        activate?: boolean;
        reveal?: boolean;
     ```
     *
     * @param commands
     */
    registerCommands(commands: CommandRegistry): void {
        commands.registerCommand(GettingStarted2Command, {
            execute: () => super.openView({ activate: false, reveal: true })
        });
    }

    /**
     * Example menu registration to contribute a menu item used to open the widget.
     * Default location when extending the `AbstractViewContribution` is the `View` main-menu item.
     * 
     * We can however define new menu path locations in the following way:
     ```ts
        menus.registerMenuAction(CommonMenus.HELP, {
            commandId: 'id',
            label: 'label'
        });
     ```
     * 
     * @param menus
     */
    registerMenus(menus: MenuModelRegistry): void {
        super.registerMenus(menus);
    }
}
