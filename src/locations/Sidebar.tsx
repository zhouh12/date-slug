import React, { useEffect, useState } from 'react';
import { List, ListItem, Note, Paragraph } from '@contentful/f36-components';
import { SidebarAppSDK } from '@contentful/app-sdk';
import { /* useCMA, */ useSDK } from '@contentful/react-apps-toolkit';

const CONTENT_FIELD_ID = 'internalName';
const WORDS_PER_MINUTE = 200;

const Sidebar = () => {
  const sdk = useSDK<SidebarAppSDK>();
  /*
     To use the cma, inject it as follows.
     If it is not needed, you can remove the next line.
  */
  // const cma = useCMA();

  //return <Paragraph>Hello Sidebar Component (AppId: {sdk.ids.app})</Paragraph>;

  const contentField = sdk.entry.fields[CONTENT_FIELD_ID];
  const [blogText, setBlogText] = useState(contentField.getValue());

  // Listen for onChange events and update the value
  useEffect(() => {
    const detach = contentField.onValueChanged((value) => {
      setBlogText(value);
    });
    return () => detach();
  }, [contentField]);

  // example implementation of a reading time calculator
  const readingTime = (text: string): { words: number; text: string } => {
    const wordCount = text.length;
    const minutes = Math.ceil(wordCount / WORDS_PER_MINUTE);
    return {
      words: wordCount,
      text: `${minutes} min read`,
    };
  };

  // Calculate the metrics based on the new value
  const stats = readingTime(blogText || '');

  // Render the metrics with Forma36 components
  return (
    <>
      <Note style={{ marginBottom: '12px' }}>
        Metrics for your blog post:
        <List style={{ marginTop: '12px' }}>
          <ListItem>Word count: {stats.words}</ListItem>
          <ListItem>Reading time: {stats.text}</ListItem>
        </List>
      </Note>
    </>
  );
};

export default Sidebar;
