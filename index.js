class CustomUi extends Meister.Ui {
    constructor(config, meister) {
        super(config, meister);
    }
}

CustomUi.pluginName = 'customui';

Meister.registerPlugin(CustomUi.pluginName, CustomUi);
export default CustomUi;
