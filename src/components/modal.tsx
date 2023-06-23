import { useRef, useEffect } from "react"

interface ModalProps
  extends Omit<
    React.HTMLAttributes<HTMLDialogElement>,
    "onMouseEnter" | "onMouseLeave"
  > {
  show: boolean
  setShow: React.Dispatch<React.SetStateAction<boolean>>
}

export const Modal: React.FC<React.PropsWithChildren<ModalProps>> = ({
  children,
  show,
  setShow,
  ...attrs
}) => {
  const hovering = useRef(false)

  function handleClick() {
    if (!hovering.current) {
      setShow(false)
    }
  }

  useEffect(() => {
    window.addEventListener("mousedown", handleClick)

    return () => window.removeEventListener("mousedown", handleClick)
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