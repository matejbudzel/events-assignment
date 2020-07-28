import React from 'react';
import {Markdown} from '../../api/typings/api-common-types';
import ReactMarkdown from 'react-markdown';

import './markdown-preview.scss';

export type MarkdownPreviewProps = {
	content: Markdown;
};

const MarkdownPreview = ({content}: MarkdownPreviewProps) => (
	<div className="markdown-preview">
		<ReactMarkdown source={content} />
	</div>
);

export default MarkdownPreview;
