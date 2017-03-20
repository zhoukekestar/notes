---
layout: post
title:  "Node Attributes: nodeName, tagName, nodeType"
date:   2017-01-04 10:32:00 +0800
categories: node Attributes nodetype nodeName tagName
tags: [javascript]
---

<style type='text/css'>
  table {
    border-collapse: collapse;
    margin: 20px 0;
  }
  table td, table th {
    border: solid 1px #ccc;
    padding: 5px;
  }
</style>

# Attributes

| Attr | Notes | Link |
| --- | --- | --- |
| Element.tagName | In XML (and XML-based languages such as XHTML), tagName preserves case. On HTML elements in DOM trees flagged as HTML documents, tagName returns the element name in the uppercase form. The value of tagName is the same as that of nodeName. | [https://developer.mozilla.org/en-US/docs/Web/API/Element/tagName](https://developer.mozilla.org/en-US/docs/Web/API/Element/tagName) |
| Node.nodeName | The Node.nodeName read-only property returns the name of the current node as a string. | [https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeName](https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeName) |
| Node.nodeType | The nodeType property can be used to distinguish different kind of nodes, such that elements, text and comments, from each other. | [https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType](https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType) |
| ShadowRoot.host | The host read-only property of the ShadowRoot returns the DOM element to which the ShadowRoot is attatched. | [https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/host](https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/host) |


# Node Name

| Interface | nodeName value |
| --- | --- |
| Attr | The value of Attr.name |
| CDATASection | "#cdata-section" |
| Comment | "#comment" |
| Document | "#document" |
| DocumentFragment | "#document-fragment" |
| DocumentType | The value of DocumentType.name |
| Element | The value of Element.tagName |
| Entity | The entity name |
| EntityReference | The name of entity reference |
| Notation | The notation name |
| ProcessingInstruction | The value of ProcessingInstruction.target |
| Text | "#text" |

# Node type constants

| Constant | Value | Description | Example |
| --- | --- | --- |
| Node.ELEMENT_NODE	| 1	 | An Element node such as &lt;p> or &lt;div>. | `document.createElement('div').nodeType` |
| Node.TEXT_NODE	| 3	 | The actual Text of Element or Attr. | `document.createTextNode('Hello').nodeType` |
| Node.PROCESSING_INSTRUCTION_NODE	| 7	 | A ProcessingInstruction of an XML document such as <?xml-stylesheet ... ?> declaration. | |
| Node.COMMENT_NODE	| 8	 | A Comment node. | `document.createComment('your comment').nodeType` |
| Node.DOCUMENT_NODE	| 9	 | A Document node. | `document.body.parentNode.parentNode.nodeType` |
| Node.DOCUMENT_TYPE_NODE	| 10 | 	A DocumentType node e.g. <!DOCTYPE html> for HTML5  documents. | `document.body.parentNode.parentNode.firstChild.nodeType` |
| Node.DOCUMENT_FRAGMENT_NODE	| 11 | 	A DocumentFragment node. | `document.createDocumentFragment().nodeType` |
