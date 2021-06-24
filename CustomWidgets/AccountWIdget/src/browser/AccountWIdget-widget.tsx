import * as React from 'react';
import { injectable, postConstruct, inject } from 'inversify';
import { AlertMessage } from '@theia/core/lib/browser/widgets/alert-message';
import { ReactWidget } from '@theia/core/lib/browser/widgets/react-widget';
import { MessageService } from '@theia/core';

@injectable()
export class AccountWIdgetWidget extends ReactWidget {

 /*   state = {
        text: "",
    };*/


    
    static readonly ID = 'AccountWIdget:widget';
    static readonly LABEL = 'Atlas Map';

    @inject(MessageService)
    protected readonly messageService!: MessageService;

    @postConstruct()
    protected async init(): Promise < void> {
        this.id = AccountWIdgetWidget.ID;
        this.title.label = AccountWIdgetWidget.LABEL;
        this.title.caption = AccountWIdgetWidget.LABEL;
        this.title.closable = false;
        this.title.iconClass = 'accountWidgetIcon'; // example widget icon.
        this.update();
    }

    protected render(): React.ReactNode {
        const header = `This is our Atlas Map widget`;
        return <div id='widget-container'>
            <AlertMessage type='INFO' header={header} /> 
            Check this box to toggle the widget from being closable and unclosable  <br></br>       
            <input type="checkbox" defaultChecked={this.title.closable} onChange={e => this.title.closable = e.target.checked} /><br></br>
            <br></br>
            <iframe width="100%" height="800px" src="http://localhost:8586"></iframe>
            <br></br>
            <button className='theia-button secondary' title='Display Message' onClick={_a => this.displayMessage()}>Display Message</button>
        </div>
    }

    protected displayMessage(): void {
        this.messageService.info('Congratulations: AccountWIdget Widget Successfully Created!');
        
        //put the below back in render statement for display message button to work
        //<button className='theia-button secondary' title='Display Message' onClick={_a => this.displayMessage()}>Display Message</button>

    }

}
