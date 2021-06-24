import { ContainerModule } from 'inversify';
import { OpenMapperWidget } from './OpenMapper-widget';
import { OpenMapperContribution } from './OpenMapper-contribution';
import { bindViewContribution, FrontendApplicationContribution, WidgetFactory } from '@theia/core/lib/browser';

import '../../src/browser/style/index.css';

export default new ContainerModule(bind => {
    bindViewContribution(bind, OpenMapperContribution);
    bind(FrontendApplicationContribution).toService(OpenMapperContribution);
    bind(OpenMapperWidget).toSelf();
    bind(WidgetFactory).toDynamicValue(ctx => ({
        id: OpenMapperWidget.ID,
        createWidget: () => ctx.container.get<OpenMapperWidget>(OpenMapperWidget)
    })).inSingletonScope();
});
