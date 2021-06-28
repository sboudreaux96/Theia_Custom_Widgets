import * as React from 'react';
import { injectable, postConstruct, inject } from 'inversify';
import { ReactWidget } from '@theia/core/lib/browser/widgets/react-widget';
import { MessageService } from '@theia/core';

@injectable()
export class PropertyViewWidget extends ReactWidget {

    static readonly ID = 'PropertyView:widget';
    static readonly LABEL = 'Property View ';

    @inject(MessageService)
    protected readonly messageService!: MessageService;

    @postConstruct()
    protected async init(): Promise < void> {
        this.id = PropertyViewWidget.ID;
        this.title.label = PropertyViewWidget.LABEL;
        this.title.caption = PropertyViewWidget.LABEL;
        this.title.closable = true;
        this.title.iconClass = 'fa fa-window-maximize'; // example widget icon.
        this.update();
    }

    protected render(): React.ReactNode {
        return <div id='widget-container'>
            <table width="100%">
            <tr>
                <th>General</th>
            </tr>
            <tr>
                <td>Type</td>
                <td width="100%"><input type="text" name="type"/></td>
            </tr>
            <tr>
                <td>Stereotype</td>
                <td><input type="text" name="type"/></td>
            </tr>
            <tr>
                <td>Alias</td>
                <td><input type="text" name="type"/></td>
            </tr>
            <tr>
                <td>Keywords</td>
                <td><input type="text" name="type"/></td>
            </tr>
            <tr>
                <td>Status</td>
                <td><input type="text" name="type"/></td>
            </tr>
            <tr>
                <td>Version</td>
                <td><input type="text" name="type"/></td>
            </tr>
            
            <tr>
                <th>Class</th>
            </tr>
            <tr>
                <td>Abstract</td>
                <td><input type="checkbox" name="type"/></td>
            </tr>
			<tr>
                <td>Active</td>
                <td><input type="checkbox" name="type"/></td>
            </tr>
            <tr>
                <td>Classifier Behavior</td>
                <td><input type="text" name="type"/></td>
            </tr>
            <tr>
                <td>Final Specialization</td>
                <td><input type="checkbox" name="type"/></td>
            </tr>
            <tr>
                <td>Leaf</td>
                <td><input type="checkbox" name="type"/></td>
            </tr>
            <tr>
                <td>Visibility</td>
                <td><input type="text" name="type"/></td>
            </tr>
            </table>
        </div>
    }
}
