'use client'

import type { ClientCollectionConfig } from 'payload'

import { getTranslation } from '@payloadcms/translations'
import {
  Button,
  DeleteMany,
  EditMany,
  Gutter,
  ListControls,
  ListHeader,
  ListSelection,
  Pagination,
  PerPage,
  PublishMany,
  RelationshipProvider,
  RenderComponent,
  SelectionProvider,
  SetViewActions,
  StaggeredShimmers,
  Table,
  UnpublishMany,
  useAuth,
  useBulkUpload,
  useConfig,
  useEditDepth,
  useListInfo,
  useListQuery,
  useModal,
  useStepNav,
  useTranslation,
  useWindowInfo,
  ViewDescription,
} from '@payloadcms/ui'
import LinkImport from 'next/link.js'
import { useRouter } from 'next/navigation.js'
import { formatFilesize, isNumber } from 'payload/shared'
import React, { Fragment, useEffect } from 'react'
import { User } from './../payload-types'

const baseClass = 'collection-list'
// const Link = (LinkImport.default || LinkImport) as unknown as typeof LinkImport.default

export const ListView: React.FC = () => {
  const { user } = useAuth()
  const {
    beforeActions,
    collectionSlug,
    disableBulkDelete,
    disableBulkEdit,
    hasCreatePermission,
    Header,
    newDocumentURL,
  } = useListInfo()

  const router = useRouter()

  const { data, defaultLimit, handlePageChange, handlePerPageChange, params } = useListQuery()
  const { openModal } = useModal()
  const { setCollectionSlug, setOnSuccess } = useBulkUpload()
  const { drawerSlug } = useBulkUpload()

  const { getEntityConfig } = useConfig()

  const collectionConfig = getEntityConfig({ collectionSlug }) as ClientCollectionConfig

  const {
    admin: {
      components: {
        afterList,
        afterListTable,
        beforeList,
        beforeListTable,
        Description,
        views: {
          list: { actions },
        },
      },
      description,
    },
    fields,
    labels,
  } = collectionConfig

  const { i18n, t } = useTranslation()

  const drawerDepth = useEditDepth()

  const { setStepNav } = useStepNav()

  const {
    breakpoints: { s: smallBreak },
  } = useWindowInfo()

  let docs = data.docs || []

  const isUploadCollection = Boolean(collectionConfig.upload)

  if (isUploadCollection) {
    docs = docs?.map((doc) => {
      return {
        ...doc,
        filesize: formatFilesize(doc.filesize),
      }
    })
  }

  const openBulkUpload = React.useCallback(() => {
    setCollectionSlug(collectionSlug)
    openModal(drawerSlug)
    setOnSuccess(() => router.refresh())
  }, [router, collectionSlug, drawerSlug, openModal, setCollectionSlug, setOnSuccess])

  useEffect(() => {
    if (drawerDepth <= 1) {
      setStepNav([
        {
          label: labels?.plural,
        },
      ])
    }
  }, [setStepNav, labels, drawerDepth])

  const isBulkUploadEnabled = isUploadCollection && collectionConfig.upload.bulkUpload

  return (
  
          <ListControls collectionConfig={collectionConfig} fields={fields} />
  )
}