'use client'

import React from 'react'
import { useField, TextField, Button, ListControls, useConfig } from '@payloadcms/ui'
import { TextFieldValidation, TextFieldClientProps } from 'payload'
import { text } from 'payload/shared'
import type { ClientCollectionConfig } from 'payload'

const colorMissingOctothorpRegex = new RegExp("^([A-Fa-f0-9]{8}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{4}|[A-Fa-f0-9]{3})$");

 export const Search: React.FC<TextFieldClientProps> = ({ ...props }) => {
  const { value, setValue } = useField<string>({})

  // Mutating the value in a validation handler....
  // Is there any other way to do this?
  const validateText: TextFieldValidation = (value, options) => {
    if (value && colorMissingOctothorpRegex.test(value)) {
      value = `#${value}`
      setValue(value)
    }
    return text(value, options)
  }

  const collectionSlug = 'pages';
  const { getEntityConfig } = useConfig()
  const collectionConfig = getEntityConfig({ collectionSlug }) as ClientCollectionConfig
   console.log('collectionConfig',collectionConfig);
   console.log('collectionConfig',collectionConfig.fields);

  return (
    <div className={ 'flex items-center gap-6' }>
      <div
        className={ 'color-swatch w-32 h-32' }
        style={{ backgroundColor: value || '#00000000' }}
      />
      <TextField
        { ...props }
        validate={validateText}
      />
      <Button
        aria-label='Create New'
        buttonStyle="pill"
        onClick={()=>{console.log('hello')}}
        size="small"
        >
         Create New
       </Button>
      < ListControls collectionConfig={collectionConfig} fields={collectionConfig.fields} />
    </div>
  )
}
