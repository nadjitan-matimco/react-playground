import React, { useRef, useEffect } from "react"

interface ModalProps
  extends Omit<
    React.HTMLAttributes<HTMLDialogElement>,
    "onMouseEnter" | "onMouseLeave" | "open"
  > {
  show: boolean
  setShow: React.Dispatch<React.SetStateAction<boolean>>
  toggler?: React.RefObject<HTMLElement>
}

export const Modal: React.FC<React.PropsWithChildren<ModalProps>> = ({
  children,
  show,
  setShow,
  toggler,
  ...attrs
}) => {
  const hovering = useRef(false)

  function handleClick(ev: MouseEvent) {
    if (
      toggler &&
      toggler.current &&
      toggler.current.contains(ev.target as Node)
    ) {
      return
    }
    setShow(false)
  }

  useEffect(() => {
    window.addEventListener("mousedown", handleClick)

    return () => {
      window.removeEventListener("mousedown", handleClick)
    }
  }, [])

  return (
    <dialog
      open={show}
      onMouseEnter={() => (hovering.current = true)}
      onMouseLeave={() => (hovering.current = false)}
      {...attrs}>
      {children}
    </dialog>
  )
}
