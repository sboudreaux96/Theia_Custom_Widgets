import * as React from '@theia/core/shared/react';
import URI from '@theia/core/lib/common/uri';
import { injectable, inject, postConstruct } from '@theia/core/shared/inversify';
import { ReactWidget } from '@theia/core/lib/browser/widgets/react-widget';
import { CommandRegistry, isOSX, environment, Path } from '@theia/core/lib/common';
import { WorkspaceCommands, WorkspaceService } from '@theia/workspace/lib/browser';
import { CommonCommands, LabelProvider, Key, KeyCode, ApplicationShell } from '@theia/core/lib/browser';
import { ApplicationInfo, ApplicationServer } from '@theia/core/lib/common/application-protocol';
import { EnvVariablesServer } from '@theia/core/lib/common/env-variables';
import { WindowService } from '@theia/core/lib/browser/window/window-service';
@injectable()
export class GettingStarted2Widget extends ReactWidget {
    /**
     * The widget `id`.
     */
     static readonly ID = 'getting.started.widget';
     /**
      * The widget `label` which is used for display purposes.
      */
     static readonly LABEL = 'Getting Started';
 
     /**
      * The `ApplicationInfo` for the application if available.
      * Used in order to obtain the version number of the application.
      */
     protected applicationInfo: ApplicationInfo | undefined;
     /**
      * The application name which is used for display purposes.
      */
     protected applicationName = "MD3i";
 
     protected home: string | undefined;
 
     /**
      * The recently used workspaces limit.
      * Used in order to limit the number of recently used workspaces to display.
      */
     protected recentLimit = 5;
     /**
      * The list of recently used workspaces.
      */
     protected recentWorkspaces: string[] = [];
 
     /**
      * Collection of useful links to display for end users.
      */
     protected readonly documentationUrl = 'https://www.xtensible.net/services/';
     protected readonly extensionUrl = 'https://www.xtensible.net/about/our-team/';
     protected readonly pluginUrl = 'https://www.theia-ide.org/docs/authoring_plugins';
 
     @inject(ApplicationServer)
     protected readonly appServer: ApplicationServer;
 
     @inject(CommandRegistry)
     protected readonly commandRegistry: CommandRegistry;
 
     @inject(EnvVariablesServer)
     protected readonly environments: EnvVariablesServer;
 
     @inject(LabelProvider)
     protected readonly labelProvider: LabelProvider;
 
     @inject(WindowService)
     protected readonly windowService: WindowService;
 
     @inject(WorkspaceService)
     protected readonly workspaceService: WorkspaceService;

     @inject(ApplicationShell)
     protected readonly applicationShell: ApplicationShell;

     @postConstruct()
     protected async init(): Promise<void> {
         this.id = GettingStarted2Widget.ID;
         this.title.label = GettingStarted2Widget.LABEL;
         this.title.caption = GettingStarted2Widget.LABEL;
         this.title.closable = true;
         this.title.iconClass = 'gettingStartedIcon';

         //console.info(this.applicationShell.mainPanel.isHidden);
         //this.applicationShell.mainPanel.hide();

         //console.info(this.applicationShell.mainPanel.isHidden);
         
 
         this.applicationInfo = await this.appServer.getApplicationInfo();
         this.recentWorkspaces = await this.workspaceService.recentWorkspaces();
         this.home = new URI(await this.environments.getHomeDirUri()).path.toString();
         this.update();
     }
 
     /**
      * Render the content of the widget.
      */
     protected render(): React.ReactNode {
         return <div className='gs-container'>
             {this.renderHeader()}
             <hr className='gs-hr' />
             <div className='flex-grid'>
                 <div className='col'>
                     {this.renderOpen()}
                 </div>
             </div>
             <div className='flex-grid'>
                 <div className='col'>
                     {this.renderRecentWorkspaces()}
                 </div>
             </div>
             <div className='flex-grid'>
                 <div className='col'>
                     {this.renderSettings()}
                 </div>
             </div>
             <div className='flex-grid'>
                 <div className='col'>
                     {this.renderHelp()}
                 </div>
             </div>
             <div className='flex-grid'>
                 <div className='col'>
                     {this.renderVersion()}
                 </div>
             </div>
         </div>;
     }
 
     /**
      * Render the widget header.
      * Renders the title `{applicationName} Getting Started`.
      */
     protected renderHeader(): React.ReactNode {
         return <div className='gs-header'>
             <h1>{this.applicationName}<span className='gs-sub-header'> Getting Started</span></h1>
         </div>;
     }
 
     /**
      * Render the `open` section.
      * Displays a collection of `open` commands.
      */
     protected renderOpen(): React.ReactNode {
         const requireSingleOpen = isOSX || !environment.electron.is();
 
         const open = requireSingleOpen && <div className='gs-action-container'>
             <a
                 role={'button'}
                 tabIndex={0}
                 onClick={this.doOpen}
                 onKeyDown={this.doOpenEnter}>
                 Open Project
             </a>
         </div>;
 
         /*const openFile = !requireSingleOpen && <div className='gs-action-container'>
             <a
                 role={'button'}
                 tabIndex={0}
                 onClick={this.doOpenFile}
                 onKeyDown={this.doOpenFileEnter}>
                 Open File
             </a>
         </div>;*/
 
         const openFolder = !requireSingleOpen && <div className='gs-action-container'>
             <a
                 role={'button'}
                 tabIndex={0}
                 onClick={this.doOpenFolder}
                 onKeyDown={this.doOpenFolderEnter}>
                 Open Project Folder
             </a>
         </div>;
 
         const openWorkspace = (
             <a
                 role={'button'}
                 tabIndex={0}
                 onClick={this.doOpenWorkspace}
                 onKeyDown={this.doOpenWorkspaceEnter}>
                 Open Project Workspace
             </a>
         );
 
         return <div className='gs-section'>
             <h3 className='gs-section-header'><i className='fa fa-folder-open'></i>Open</h3>
             {open}
             {openFolder}
             {openWorkspace}
         </div>;
     }
 
     /**
      * Render the recently used workspaces section.
      */
     protected renderRecentWorkspaces(): React.ReactNode {
         const items = this.recentWorkspaces;
         const paths = this.buildPaths(items);
         const content = paths.slice(0, this.recentLimit).map((item, index) =>
             <div className='gs-action-container' key={index}>
                 <a
                     role={'button'}
                     tabIndex={0}
                     onClick={() => this.open(new URI(items[index]))}
                     onKeyDown={(e: React.KeyboardEvent) => this.openEnter(e, new URI(items[index]))}>
                     {new URI(items[index]).path.base}
                 </a>
                 <span className='gs-action-details'>
                     {item}
                 </span>
             </div>
         );
         // If the recently used workspaces list exceeds the limit, display `More...` which triggers the recently used workspaces quick-open menu upon selection.
         const more = paths.length > this.recentLimit && <div className='gs-action-container'>
             <a
                 role={'button'}
                 tabIndex={0}
                 onClick={this.doOpenRecentWorkspace}
                 onKeyDown={this.doOpenRecentWorkspaceEnter}>
                 More...
             </a>
         </div>;
         return <div className='gs-section'>
             <h3 className='gs-section-header'>
                 <i className='fa fa-clock-o'></i>Recent Projects
             </h3>
             {items.length > 0 ? content : <p className='gs-no-recent'>No Recent Workspaces</p>}
             {more}
         </div>;
     }
 
     /**
      * Render the settings section.
      * Generally used to display useful links.
      */
     protected renderSettings(): React.ReactNode {
         return <div className='gs-section'>
             <h3 className='gs-section-header'>
                 <i className='fa fa-cog'></i>
                 Settings
             </h3>
             <div className='gs-action-container'>
                 <a
                     role={'button'}
                     tabIndex={0}
                     onClick={this.doOpenPreferences}
                     onKeyDown={this.doOpenPreferencesEnter}>
                     Open Preferences
                 </a>
             </div>
         </div>;
     }
 
     /**
      * Render the help section.
      */
     protected renderHelp(): React.ReactNode {
         return <div className='gs-section'>
             <h3 className='gs-section-header'>
                 <i className='fa fa-question-circle'></i>
                 Learn More About Us
             </h3>
             <div className='gs-action-container'>
                 <a
                     role={'button'}
                     tabIndex={0}
                     onClick={() => this.doOpenExternalLink(this.documentationUrl)}
                     onKeyDown={(e: React.KeyboardEvent) => this.doOpenExternalLinkEnter(e, this.documentationUrl)}>
                     Our Services
                 </a>
             </div>
             <div className='gs-action-container'>
                 <a
                     role={'button'}
                     tabIndex={0}
                     onClick={() => this.doOpenExternalLink(this.extensionUrl)}
                     onKeyDown={(e: React.KeyboardEvent) => this.doOpenExternalLinkEnter(e, this.extensionUrl)}>
                     Our Team
                 </a>
             </div>
         </div>;
     }
 
     /**
      * Render the version section.
      */
     protected renderVersion(): React.ReactNode {
         return <div className='gs-section'>
             <div className='gs-action-container'>
                 <p className='gs-sub-header' >
                     {this.applicationInfo ? 'Version ' + this.applicationInfo.version : ''}
                 </p>
             </div>
         </div>;
     }
 
     /**
      * Build the list of workspace paths.
      * @param workspaces {string[]} the list of workspaces.
      * @returns {string[]} the list of workspace paths.
      */
     protected buildPaths(workspaces: string[]): string[] {
         const paths: string[] = [];
         workspaces.forEach(workspace => {
             const uri = new URI(workspace);
             const pathLabel = this.labelProvider.getLongName(uri);
             const path = this.home ? Path.tildify(pathLabel, this.home) : pathLabel;
             paths.push(path);
         });
         return paths;
     }
 
     /**
      * Trigger the open command.
      */
     protected doOpen = () => this.commandRegistry.executeCommand(WorkspaceCommands.OPEN.id);
     protected doOpenEnter = (e: React.KeyboardEvent) => {
         if (this.isEnterKey(e)) {
             this.doOpen();
         }
     };
 
     /**
      * Trigger the open file command.
      */
     protected doOpenFile = () => this.commandRegistry.executeCommand(WorkspaceCommands.OPEN_FILE.id);
     protected doOpenFileEnter = (e: React.KeyboardEvent) => {
         if (this.isEnterKey(e)) {
             this.doOpenFile();
         }
     };
 
     /**
      * Trigger the open folder command.
      */
     protected doOpenFolder = () => this.commandRegistry.executeCommand(WorkspaceCommands.OPEN_FOLDER.id);
     protected doOpenFolderEnter = (e: React.KeyboardEvent) => {
         if (this.isEnterKey(e)) {
             this.doOpenFolder();
         }
     };
 
     /**
      * Trigger the open workspace command.
      */
     protected doOpenWorkspace = () => this.commandRegistry.executeCommand(WorkspaceCommands.OPEN_WORKSPACE.id);
     protected doOpenWorkspaceEnter = (e: React.KeyboardEvent) => {
         if (this.isEnterKey(e)) {
             this.doOpenWorkspace();
         }
     };
 
     /**
      * Trigger the open recent workspace command.
      */
     protected doOpenRecentWorkspace = () => this.commandRegistry.executeCommand(WorkspaceCommands.OPEN_RECENT_WORKSPACE.id);
     protected doOpenRecentWorkspaceEnter = (e: React.KeyboardEvent) => {
         if (this.isEnterKey(e)) {
             this.doOpenRecentWorkspace();
         }
     };
 
     /**
      * Trigger the open preferences command.
      * Used to open the preferences widget.
      */
     protected doOpenPreferences = () => this.commandRegistry.executeCommand(CommonCommands.OPEN_PREFERENCES.id);
     protected doOpenPreferencesEnter = (e: React.KeyboardEvent) => {
         if (this.isEnterKey(e)) {
             this.doOpenPreferences();
         }
     };
 
     /**
      * Trigger the open keyboard shortcuts command.
      * Used to open the keyboard shortcuts widget.
      */
     /*protected doOpenKeyboardShortcuts = () => this.commandRegistry.executeCommand(KeymapsCommands.OPEN_KEYMAPS.id);
     protected doOpenKeyboardShortcutsEnter = (e: React.KeyboardEvent) => {
         if (this.isEnterKey(e)) {
             this.doOpenKeyboardShortcuts();
         }
     };*/
 
     /**
      * Open a workspace given its uri.
      * @param uri {URI} the workspace uri.
      */
     protected open = (uri: URI) => this.workspaceService.open(uri);
     protected openEnter = (e: React.KeyboardEvent, uri: URI) => {
         if (this.isEnterKey(e)) {
             this.open(uri);
         }
     };
 
     /**
      * Open a link in an external window.
      * @param url the link.
      */
     protected doOpenExternalLink = (url: string) => this.windowService.openNewWindow(url, { external: true });
     protected doOpenExternalLinkEnter = (e: React.KeyboardEvent, url: string) => {
         if (this.isEnterKey(e)) {
             this.doOpenExternalLink(url);
         }
     };
 
     protected isEnterKey(e: React.KeyboardEvent): boolean {
         return Key.ENTER.keyCode === KeyCode.createKeyCode(e.nativeEvent).key?.keyCode;
     }
 }