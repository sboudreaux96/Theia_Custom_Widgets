import { ContainerModule } from 'inversify';
import { LoggerWidget } from './Logger-widget';
import { LoggerContribution } from './Logger-contribution';
import { bindViewContribution, FrontendApplicationContribution, WidgetFactory } from '@theia/core/lib/browser';

import '../../src/browser/style/index.css';

export default new ContainerModule(bind => {
    bindViewContribution(bind, LoggerContribution);
    bind(FrontendApplicationContribution).toService(LoggerContribution);
    bind(LoggerWidget).toSelf();
    bind(WidgetFactory).toDynamicValue(ctx => ({
        id: LoggerWidget.ID,
        createWidget: () => ctx.container.get<LoggerWidget>(LoggerWidget)
    })).inSingletonScope();
});
