import { createElement } from 'lwc';
import TestIframe from 'c/testIframe';

describe('c-test-iframe', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('creates the component successfully', () => {
        // Create the component instance
        const element = createElement('c-test-iframe', {
            is: TestIframe
        });
        expect(element).not.toBeNull();
    });

    it('has an iframe element in the DOM', () => {
        // Create the component instance and attach to the DOM
        const element = createElement('c-test-iframe', {
            is: TestIframe
        });
        document.body.appendChild(element);

        // Check if the iframe element exists in the shadow DOM
        const iframe = element.shadowRoot.querySelector('iframe');
        expect(iframe).not.toBeNull();
    });

    it('has the correct source URL', () => {
        // Create the component instance and attach to the DOM
        const element = createElement('c-test-iframe', {
            is: TestIframe
        });
        document.body.appendChild(element);

        // Check if the iframe's src attribute is set correctly
        const iframe = element.shadowRoot.querySelector('iframe');
        expect(iframe.src).toBe('https://example.com/');
    });

    it('has the correct width and height', () => {
        // Create the component instance and attach to the DOM
        const element = createElement('c-test-iframe', {
            is: TestIframe
        });
        document.body.appendChild(element);

        // Check if the iframe's width and height attributes are set correctly
        const iframe = element.shadowRoot.querySelector('iframe');
        expect(iframe.width).toBe('100%');
        expect(iframe.height).toBe('600px');
    });
});