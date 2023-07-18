import React, { useEffect, useState } from 'react';
import { DateTime, Paragraph, TextInput } from '@contentful/f36-components';
import { FieldAppSDK } from '@contentful/app-sdk';
import { /* useCMA, */ useSDK } from '@contentful/react-apps-toolkit';

import { SlugEditor } from '@contentful/field-editor-slug';
// const CONTENT_FIELD_ID = 'internalName';
// const Field = () => {
//   const sdk = useSDK<FieldAppSDK>();
//   const contentField = sdk.entry.fields[CONTENT_FIELD_ID];
//   const [slug, setSlug] = useState(contentField.getValue());

//   const slugify = (str: string) =>
//       str
//         .toLowerCase()
//         .trim()
//         .replace(/[^\w\s-]/g, '')
//         .replace(/[\s_-]+/g, '-')
//         .replace(/^-+|-+$/g, '/');

//   useEffect(() => {
//     const handleChange = (value: string) => {
//       if (value) {
//         slugify(value)
//         const currentDate = new Date();
//         const year = currentDate.getFullYear();
//         const month = String(currentDate.getMonth() + 1).padStart(2, '0');
//         const day = String(currentDate.getDate()).padStart(2, '0');
//         setSlug(`${year}-${month}-${day}-${value}`);
//         sdk.field.setValue(`${year}-${month}-${day}-${value}`);
//       }else{
//         sdk.field.setValue('');
//       }
//     };

//     const detach = contentField.onValueChanged(handleChange);
//     return () => {
//       detach();
//     };
//   }, [contentField]);

//   return(<>
//    <SlugEditor field={sdk.field} baseSdk={sdk}/>
//    </>);
// };

// export default Field;

const Field = () => {
    const sdk = useSDK<FieldAppSDK>();
    
    sdk.window.startAutoResizer();
    const titleField = sdk.entry.fields[sdk.contentType.displayField];
  
    /** Turn a string into a slug. 
     * Example: "Test page" becomes "test-page"
     * https://www.30secondsofcode.org/js/s/slugify
     */
    const slugify = (str: string) =>
      str
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
  
    function updateSlugField(value: any) {
    //   console.log('sdk.entry.fields', sdk.entry.getSys().publishedAt)
      if (value === undefined || sdk.entry.getSys().publishedAt) return;

      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const day = String(currentDate.getDate()).padStart(2, '0');

      const slugWithPrefix = `${year}-${month}-${day}-${slugify(value)}`;    
      sdk.field.setValue(slugWithPrefix);
    }
  
    titleField.onValueChanged(updateSlugField);
  
    sdk.window.updateHeight();
  
    return (
      <div>
          <label>test111</label>
          <SlugEditor field={sdk.field} baseSdk={sdk} />
      </div>
    );
  };
  
  export default Field;