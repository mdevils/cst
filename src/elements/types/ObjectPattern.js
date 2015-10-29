import Node from '../Node';

export default class ObjectPattern extends Node {
    constructor(childNodes) {
        super('ObjectPattern', childNodes);
    }

    _acceptChildren(children) {
        var properties = [];
        children.passToken('Punctuator', '{');
        children.skipNonCode();
        while (!children.isToken('Punctuator', '}')) {
            if (children.isToken('Punctuator', ',')) {
                children.moveNext();
                children.skipNonCode();
                children.assertToken('Punctuator', '}');
            } else {
                if (children.isNode('RestProperty')) {
                    properties.push(children.passNode('RestProperty'));
                } else {
                    properties.push(children.passNode('Property'));
                }
                children.skipNonCode();
                if (children.isToken('Punctuator', ',')) {
                    children.moveNext();
                    children.skipNonCode();
                }
            }
        }
        children.passToken('Punctuator', '}');
        children.assertEnd();
        this._properties = properties;
    }

    get properties() {
        return this._properties.concat();
    }

    get isPattern() {
        return true;
    }

    get isAssignable() {
        return true;
    }
}
