# HTML Ui #

A plugin for the Meister.js video player that allows you to create your own ui, optionally making use of preconfigured elements.

### How do I get set up? ###

When initializing the player add `HtmlUi` with it's own configuration to the configuration object.
If you do not configure the plugin or leave the ui-configuration property empty (or the queryselector does not resolve to a node) the plugin will revert to using the default userinterface.

```JavaScript
var player = new Meister("#querySelector", {
    HtmlUi: {
        ui: document.querySelector('#custom-ui-element'), // (optional) Root element of your custom Ui,  url to a template or string containing HTML
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
<div id="custom-element-1" data-mstr-events="mouseover" class="custom-wrapper-class">
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
- **"stepbackbutton"**: Insert a button that allows the user to seek backwards a specific amount of time.
- **"stepforwardbutton"**: Insert a button that allows the user to seek forwards a specific amount of time.
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
        The id of the element, should it have one.
    - **meister**  :: *Meister*  
        The meister instance this element registered the events on.
* [optional] **standard** :: *Object*  
    Settings for the preconfigured elements. These mirror the options available for the StandardUi plugin for now.
    * [optional] **disablePauseWithLive** :: *Boolean*  
        Flag indicating whether the viewer can pause live content or not. Defaults to false.


### Remote Template ##

When using a remote template there are a couple of caveats to take into consideration. The current architecture of the Meister player assumes that the ui is built synchronously, which poses problems when fetching a template. In a future version this will be adressed for a smoother experience. For now you can work around this by using a callback to notify you when the template has finished downloading and parsing. Below is an example of how you could structure this. 

#### Example ####

```HTML
<!-- File: index.html -->
<div class="container">
    <div id="querySelector">

    </div>
</div>

<script>
    // Due to the async nature of the template request we need to keep track of what finishes first.
    var uiLoaded = false;
    var playerInitialized = false;

    var player = new Meister("#querySelector", {
        HtmlUi: {
            ui: 'templates/custom-template.html',
            remoteTemplateReady: function () {
                // If the player construction finished go ahead and load the player.
                // If it hasn't, set a flag so the player can load after finishing constructing.
                if (playerInitialized) {
                    startPlayer();
                } else {
                    uiLoaded = true;
                }
            },
            registeredCallback: function (registeredEvent) {
                console.log('Registered events to a custom element: ', registeredEvent);
            },
            standard: {
                disablePauseWithLive: true,
                stepBack: 30,
                stepForward: 30,
            }
        }
    });
    
    playerInitialized = true;

    // If the ui has loaded before the constructor finished load the player.
    if (uiLoaded) {
        startPlayer();
    }

    // Helper funtion to start the player.
    function startPlayer() {
        player.setItem({ src: 'SRC_URL', type: 'mp4' });
        player.load();
    }
</script>
<!-- End of file: index.html -->

<!-- File: templates/custom-template.html -->
<div id="custom-ui-element" data-mstr-events="click" class="custom-wrapper-class">
    <div id="custom-mouseover" data-mstr-events="mouseover" class="custom-inner-class">
        <div id="custom-mouseevents" data-mstr-events="mousedown, mousemove, mouseup" class="custom-button-class">

        </div>
        <span data-mstr-standard="stepbackbutton"></span>
        <span data-mstr-standard="playbutton"></span>
        <span data-mstr-standard="stepforwardbutton"></span>
    </div>
</div>
<!-- End of file: templates/custom-template.html -->
```



#### Option: Custom Events ####

Optionally you can use the eventbus of Meisterplayer to register and handle UI-events from the HtmlUi. An advantage of using Meister's eventbus is the reference to the meister-instance which triggered the UI-event, you would have to maintain a registry of instances and some way to determine the instance that fired an UI-event if you'd chosen to implement your own event-handling.

You can register events to your elements by setting the `data-mstr-events` attribute on the element, with a comma seperated list of eventnames as the value. Should one of the specified events trigger on the DOM node this will be emitted through the Meister instance's event bus with the following format: `"ui:[<element-id>]:<eventtype>"`.

For example, take the template below:

```HTML
<div id="custom-element-1" data-mstr-events="mouseover" class="custom-wrapper-class">
    <div id="custom-element-2" data-mstr-events="mousedown, mousemove, mouseup" class="custom-inner-class">
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
- "ui:click" (Since the innermost `div` does not have an id the event is not namespaced)

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
    The complete event string the callback was registered under. Follows the following format `"ui:[<element-id>]:<eventtype>"`.
- **eventType** :: *String*  
    The type of event, that was emitted from the DOM. Examples include `"mouseover"` or `"click"`. This is always the same as the `<eventtype>` part of the eventName.
- **meister** :: *Meister*  
    Reference to the meister instance the event was emitted on.
