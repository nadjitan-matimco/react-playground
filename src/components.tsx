import { useRef, useEffect, createContext, useContext, useState } from "react"

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

import { useAutoAnimate } from "@formkit/auto-animate/react"

type Snackbar = {
  type: "info" | "success" | "attention" | "failed"
  msg: string
}
type SnackbarListProps = {
  snackbarList: Map<string, Snackbar>
  addSnackbar: (item: Snackbar) => void
  deleteSnackbar: (id: string) => void
}

const initialState: SnackbarListProps = {
  snackbarList: new Map(),
  addSnackbar: () => {},
  deleteSnackbar: () => {},
}

const SnackbarContext = createContext<SnackbarListProps>(initialState)

export const useSnackbar = () => {
  const context = useContext(SnackbarContext)

  return context
}

export const SnackbarListProvider: React.FC<
  React.PropsWithChildren
> = props => {
  const [list, setList] = useState<Map<string, Snackbar>>(new Map())

  function addSnackbar(item: Snackbar) {
    if (list.size > 4) {
      list.delete(list.keys().next().value)
    }

    const id = item.type + item.msg

    list.set(id, item)
    setList(new Map([...list]))
    setTimeout(() => {
      list.delete(id)
      setList(new Map([...list]))
    }, 4000)
  }

  function deleteSnackbar(id: string) {
    list.delete(id)
    setList(new Map([...list]))
  }

  return (
    <SnackbarContext.Provider
      value={{ snackbarList: list, addSnackbar, deleteSnackbar }}>
      {props.children}
    </SnackbarContext.Provider>
  )
}

export const SnackbarList: React.FC<
  Omit<React.HTMLAttributes<HTMLUListElement>, "ref">
> = props => {
  const [parent] = useAutoAnimate({ duration: 150 })
  const { snackbarList, deleteSnackbar } = useSnackbar()

  return (
    <ul ref={parent} {...props}>
      {Array.from(snackbarList).map(([id, obj]) => (
        <li
          key={obj.msg + id}
          onClick={() => deleteSnackbar(id)}
          className="pointer-events-auto flex h-fit w-full cursor-pointer items-center overflow-hidden rounded-lg bg-white shadow-md hover:shadow-xl">
          <span
            className={`flex h-full items-center px-4 py-4 ${
              obj.type === "info"
                ? "bg-theme-primary"
                : obj.type === "success"
                ? "bg-theme-success"
                : obj.type === "attention"
                ? "bg-theme-warning"
                : obj.type === "failed"
                ? "bg-theme-critical"
                : ""
            }`}>
            {obj.type === "info" && (
              <IonIosInformationCircle className="h-5 w-5 fill-black" />
            )}
            {obj.type === "success" && (
              <IonCheckmarkCircle className="h-5 w-5 fill-black" />
            )}
            {obj.type === "attention" && (
              <IonWarning className="h-5 w-5 fill-black" />
            )}
            {obj.type === "failed" && (
              <IonCloseCircle className="h-5 w-5 fill-black" />
            )}
          </span>
          <h3 className="text-theme-on-surface mx-2 line-clamp-2 text-sm">
            {obj.msg}
          </h3>
        </li>
      ))}
    </ul>
  )
}

function IonIosInformationCircle(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 512 512"
      {...props}>
      <path d="M256 48C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48zm19 304h-38.2V207.9H275V352zm-19.1-159.8c-11.3 0-20.5-8.6-20.5-20s9.3-19.9 20.5-19.9c11.4 0 20.7 8.5 20.7 19.9s-9.3 20-20.7 20z"></path>
    </svg>
  )
}
function IonCheckmarkCircle(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 512 512"
      {...props}>
      <path d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208s208-93.31 208-208S370.69 48 256 48Zm108.25 138.29l-134.4 160a16 16 0 0 1-12 5.71h-.27a16 16 0 0 1-11.89-5.3l-57.6-64a16 16 0 1 1 23.78-21.4l45.29 50.32l122.59-145.91a16 16 0 0 1 24.5 20.58Z"></path>
    </svg>
  )
}
function IonCloseCircle(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 512 512"
      {...props}>
      <path d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208s208-93.31 208-208S370.69 48 256 48Zm75.31 260.69a16 16 0 1 1-22.62 22.62L256 278.63l-52.69 52.68a16 16 0 0 1-22.62-22.62L233.37 256l-52.68-52.69a16 16 0 0 1 22.62-22.62L256 233.37l52.69-52.68a16 16 0 0 1 22.62 22.62L278.63 256Z"></path>
    </svg>
  )
}
function IonWarning(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 512 512"
      {...props}>
      <path d="M449.07 399.08L278.64 82.58c-12.08-22.44-44.26-22.44-56.35 0L51.87 399.08A32 32 0 0 0 80 446.25h340.89a32 32 0 0 0 28.18-47.17Zm-198.6-1.83a20 20 0 1 1 20-20a20 20 0 0 1-20 20Zm21.72-201.15l-5.74 122a16 16 0 0 1-32 0l-5.74-121.95a21.73 21.73 0 0 1 21.5-22.69h.21a21.74 21.74 0 0 1 21.73 22.7Z"></path>
    </svg>
  )
}
