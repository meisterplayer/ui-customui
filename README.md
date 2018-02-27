# HTML Ui #

A plugin for the Meister.js video player that allows you to create your own ui, optionally making use of preconfigured elements.

### How do I get set up? ###

When initializing the player add `HtmlUi` with it's own configuration to the configuration object.
If you do not configure the plugin or leave the ui-configuration property empty (or the queryselector does not resolve to a node) the plugin will revert to using the default userinterface.

```JavaScript
var player = new Meister("#querySelector", {
    HtmlUi: {
        ui: document.querySelector('#custom-ui-element'), // (optional) Root element of your custom Ui or string containing HTML
        registeredCallback: function (registeredEvent) { // Callback to call when events are registered on a custom element.
            console.log('Registered events to a custom element: ', registeredEvent);
        },
        standard: { // Options to pass to the preconfigured elements.
            stepForward: 30,
        }
    }
});

player.on('ui:custom-element:mouseover', function (e) {
    console.log('This is a mouseover event from a custom-element :', e);
});
```

##### Registering Elements #####

By passing a function to the `registeredCallback` config object you can further customize your elements. This is called with a `HtmlUiElementRegisteredEvent` for every element that has the `"data-mstr-events"` attribute. This allows you to bind Meister events back to the element:


```JavaScript
var player = new Meister("#querySelector", {
    HtmlUi: {
        ui: document.querySelector('#custom-ui-element'),
        registeredCallback: function (registeredEvent) {
            var meisterInstance = registeredEvent.meister

            if (registeredEvent.id === 'custom-time-display') {
                // Update the current time display when the time changes.
                var timeDisplayElement = registeredEvent.element;
                meisterInstance.on('playerTimeUpdate', function(timeUpdateEvent) {
                    timeDisplayElement.textContent = formatTime(timeUpdateEvent.currentTime) + " / " + formatTime(timeUpdateEvent.duration);
                });
            }
        }
    }
});
```

For a list of all properties of the `HtmlUiElementRegisteredEvent` see the Configuration section of this document.

#### Standard Components ####

You can also opt to use custom prebuilt elements by using the `"data-mstr-standard"` attribute with the desired element name as the value. This will **replace** the element on which the attribute is set with the prebuilt element.

```HTML
<div data-mstr-id="custom-element-1" data-mstr-events="mouseover" class="custom-wrapper-class">
    <div class="seekbar-container">
        <span data-mstr-standard="seekbar"></span>
    </div>
    <div class="bottom-bar-container">
        <span data-mstr-standard="playbutton"></span>
    </div>
</div>
```

In the template above the two `span` elements will be replaced with prebuilt elements. These are the same elements that are used in the StandardUi plugin.  
The following values for `"data-mstr-standard"` are supported:

- **"captionsbutton"**: Insert a button that allows the user to toggle captions should they be available.
- **"fullscreenbutton"**: Insert a button that allows the user to toggle fullscreen playback.
- **"playbutton"**: Insert a button that allows the user to play and pause the media.
- **"playlistbuttons"**: Insert a set of two buttons that allow the user to navigate through a playlist.
- **"qualitybutton"**: Insert a button that allows the user to select different playback qualities should they be available.
- **"seekbar"**: Insert a seek bar that allows the user to seek to different parts of the media. It also displays playback position and buffer info where available.
- **"spinner"**: Insert a spinner that shows up when the player is buffering or processing other tasks.
- **"stepbackbutton"**: Insert a button that allows the user to seek backwards a specific amount of time. Amount can be configured by using standard.stepBack value
- **"stepforwardbutton"**: Insert a button that allows the user to seek forwards a specific amount of time. Amount can be configured by using standard.stepForward value
- **"timedisplay"**: Insert a label that displays the current position of the media as well as the duration.
- **"volumeslider"**: Insert a control module that allows the user to change the volume.

### Configuration ###

Options are required unless marked as [optional].

* **ui** :: *HTMLElement|String*  
    Either a direct reference to a DOM node that can be parsed as custom ui, or a url to a html template to use as the custom ui.  
    **IMPORTANT** Read the section on remote template when using the url option.
* [optional] **remoteTemplateReady** :: *Function*  
    When using a remote template url this callback is called when the template has been downloaded, parsed, and was injected into the DOM.
* [optional] **registeredCallback** :: *Function*  
    This callback is called when all events were registered to an element with the `"data-mstr-events"` attribute. It is called with a `HtmlUiElementRegisteredEvent` as the single argument with the following properties:
    - **element** :: *HTMLElement*  
        Reference to the HTMLElement on which the events were registered.
    - **events** :: *String[]*  
        List of eventnames that were registered on the element.
    - **id** :: *String*  
        The `data-mstr-id` of the element, should it have one.
    - **meister**  :: *Meister*  
        The meister instance this element registered the events on.
* [optional] **standard** :: *Object*  
    Settings for the preconfigured elements. These mirror the options available for the StandardUi plugin for now.
    * [optional] **disablePauseWithLive** :: *Boolean*  
        Flag indicating whether the viewer can pause live content or not. Defaults to false.
* [optional] **hiddenClassName** :: **String** 
    (css)Class name used to hide controls. Defaults to `.mstr-hide-controls`.

#### Option: Custom Events ####

Optionally you can use the eventbus of Meisterplayer to register and handle UI-events from the HtmlUi. An advantage of using Meister's eventbus is the reference to the meister-instance which triggered the UI-event, you would have to maintain a registry of instances and some way to determine the instance that fired an UI-event if you'd chosen to implement your own event-handling.

You can register events to your elements by setting the `data-mstr-events` attribute on the element, with a comma seperated list of eventnames as the value. Should one of the specified events trigger on the DOM node this will be emitted through the Meister instance's event bus with the following format: `"ui:[<element[data-mstr-id]>]:<eventtype>"`.

For example, take the template below:

```HTML
<div data-mstr-id="custom-element-1" data-mstr-events="mouseover" class="custom-wrapper-class">
    <div data-mstr-id="custom-element-2" data-mstr-events="mousedown, mousemove, mouseup" class="custom-inner-class">
        <div data-mstr-events="click" class="custom-button-class">

        </div>
    </div>
</div>
```

As you can see it contains three elements, and all three elements have the `data-mstr-events` attribute. This would result in the following event handles:

- "ui:custom-element-1:mouseover"
- "ui:custom-element-2:mousedown"
- "ui:custom-element-2:mousemove"
- "ui:custom-element-2:mouseup"
- "ui:click" (Since the innermost `div` does not have an data-mstr-id the event is not namespaced)

You can register callbacks for these handles on the Meister instance: 

```JavaScript
player.on('ui:custom-element-1:mouseover', function(customEvent) {
    console.log('Mouseover on custom-element-1', customEvent);
});
```

All custom ui events callbacks are called with a `HtmlUiEvent` as the single argument. In this event the following properties are available:
- **element** :: *HTMLElement*  
    Reference to the DOM node on which the event was registered.
- **event** :: *Event*  
    The original DOM event.
- **eventName** :: *String*  
    The complete event string the callback was registered under. Follows the following format `"ui:[<element[data-mstr-id]>]:<eventtype>"`.
- **eventType** :: *String*  
    The type of event, that was emitted from the DOM. Examples include `"mouseover"` or `"click"`. This is always the same as the `<eventtype>` part of the eventName.
- **meister** :: *Meister*  
    Reference to the meister instance the event was emitted on.


#### Option: Directives ####

Directives are meant for more complex (but functionally 'standard') events. 
Currently the events that trigger hiding the UI have been refactored into an autoHideShow Directive. If you create your own template and want the controls to auto-hide (and show when the mouse enters the player) you should put `data-mstr-directive="autoHideShow"` on the node you want the events triggered upon. 

In the end using directives will provide you with a very flexible way to handle stuff in the UI, mostly events, but you can implement your own methods. A directive will be able to access the meister-instance and the HtmlUI-configuration. 

##### autoHideShow #####

The default template handles auto-hiding using the autoHideShow-directive. It triggers custom Meister events;

`uiEvent:hideControls`
`uiEvent:showControls`
`uiEvent:hideCursor`
`uiEvent:showCursor`

The HtmlUi plugin handles those events by adding `config.hiddenClassName` to the controls; which hides the UI with css. If no `config.hiddenClassName` is set it defaults to `.mstr-hide-controls`.
If you have your own template and use the autoHideShow-directive and do not want to use `mstr-hide-controls` you should set `config.hiddenClassName` to something of your liking. 
