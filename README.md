# Custom Ui #

A plugin for the Meister.js video player that allows you to create your own ui, optionally making use of preconfigured elements.

### How do I get set up? ###

When initializing the player add `CustomUi` with it's own configuration to the configuration object.

```JavaScript
var player = new Meister("#querySelector", {
    CustomUi: {
        ui: document.querySelector('#customUiElement'), // Root element of your custom Ui
        registeredCallback: function registeredCallback(registeredEvent) { // Callback to call when events are registered on a custom element
            console.log('Registered an element: ', registeredEvent);
        },
        standard: { // Options to pass to the preconfigured elements
            stepForward: 30,
        }
    }
});
```

### Example ###



```HTML
<div class="container">
    <div id="querySelector">

    </div>
</div>

<!-- Create the template directly in the HTML for illustration purposes -->
<div id="customUiElement" data-mstr-events="click" class="custom-wrapper-class">
    <div id="custom-mouseover" data-mstr-events="mouseover" class="custom-inner-class">
        <div id="custom-mouseevents" data-mstr-events="mousedown, mousemove, mouseup" class="custom-button-class">

        </div>
        <span data-mstr-standard="fullscreenbutton"></span>
    </div>
</div>

<script>
    var player = new Meister("#querySelector", {
        CustomUi: {
            ui: document.querySelector('#customUiElement'),
            registeredCallback: function registeredCallback(registeredEvent) {
                console.log('Registered an element: ', registeredEvent);
            },
            standard: {
                stepForward: 30,
            }
        }
    });
</script>
```



### Configuration ###
