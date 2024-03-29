/* eslint-disable prettier/prettier */
import React, { useRef, useState, useId, ElementType } from 'react'

import {
  useFloating,
  FloatingPortal,
  arrow,
  shift,
  offset,
  useHover,
  useDismiss,
  useRole,
  useFocus,
  safePolygon,
  useInteractions,
  flip,
  Placement
} from '@floating-ui/react'
import { motion, AnimatePresence } from 'framer-motion'

// components

interface PopoverProps {
  children: React.ReactNode
  className?: string
  renderPopover: React.ReactNode
  as?: ElementType
  initialOpen?: boolean
  placement?: Placement
  // offset?: number
}

export default function Popover({
  children,
  className,
  renderPopover,
  as: Element = 'div',
  initialOpen,
  placement = 'bottom-end'
  // offset = 2
}: PopoverProps) {
  const [open, setOpen] = useState(initialOpen || false)
  const arrowRef = useRef<HTMLElement>(null)
  const id = useId()
  const { refs, floatingStyles, middlewareData, context } = useFloating({
    open,
    onOpenChange: setOpen,
    middleware: [offset(2), shift(), flip(), arrow({ element: arrowRef })],
    transform: false,
    placement
  })

  const hover = useHover(context, { handleClose: safePolygon() })
  const focus = useFocus(context)
  const dismiss = useDismiss(context)
  const role = useRole(context, { role: 'tooltip' })
  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role
  ])

  return (
    <Element
      className={className}
      ref={refs.setReference}
      {...getReferenceProps()}
    >
      {children}
      <FloatingPortal id={id}>
        <AnimatePresence>
          {open && (
            <motion.div
              ref={refs.setFloating}
              style={{
                transformOrigin: `${middlewareData.arrow?.x}px top`,
                ...floatingStyles
              }}
              {...getFloatingProps()}
              initial={{ opacity: 0, transform: `scale(0)` }}
              animate={{ opacity: 1, transform: `scale(1)` }}
              exit={{ opacity: 0, transform: `scale(0)` }}
              transition={{ duration: 0.2 }}
            >
              <span
                ref={arrowRef}
                className='absolute z-10 translate-y-[-95%] border-[11px] border-x-transparent border-t-transparent border-b-white'
                style={{
                  left: middlewareData.arrow?.x,
                  top: middlewareData.arrow?.y
                }}
              />
              {renderPopover}
            </motion.div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </Element>
  )
}
