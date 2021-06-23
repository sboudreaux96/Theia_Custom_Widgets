import * as React from 'react';
import { injectable, postConstruct, inject } from 'inversify';
import { AlertMessage } from '@theia/core/lib/browser/widgets/alert-message';
import { ReactWidget } from '@theia/core/lib/browser/widgets/react-widget';
import { MessageService } from '@theia/core';

@injectable()
export class LoggerWidget extends ReactWidget {

    static readonly ID = 'Logger:widget';
    static readonly LABEL = 'Logger';

    @inject(MessageService)
    protected readonly messageService!: MessageService;

    @postConstruct()
    protected async init(): Promise < void> {
        this.id = LoggerWidget.ID;
        this.title.label = LoggerWidget.LABEL;
        this.title.caption = LoggerWidget.LABEL;
        this.title.closable = true;
        this.title.iconClass = 'fa fa-window-maximize'; // example widget icon.
        this.update();
    }

    protected render(): React.ReactNode {
        const header = `This is our logger widget!`;
        return <div id='widget-container'>
            <AlertMessage type='INFO' header={header} />
            
        </div>
    }

    /*protected displayMessage(): void {
        this.messageService.info('Congratulations: Logger Widget Successfully Created!');
    }*/

}
