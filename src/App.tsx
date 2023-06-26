import { useState } from "react"
import { Modal } from "./components/modal"
import { useSnackbar, SnackbarList } from "./components/snackbar"

function App() {
  const [showModal, setShowModal] = useState(false)
  
  const [list, setList] = useState<number[]>([])
  const { addSnackbar } = useSnackbar()

  return (
    <main className="grid h-fit w-full">
      <button
        className="mt-2 h-fit w-fit select-none rounded-md bg-black px-5 py-3 text-white"
        onClick={() => setShowModal(!showModal)}>
        OPEN
      </button>
      <button
        className="mt-2 h-fit w-fit select-none rounded-md bg-black px-5 py-3 text-white"
        onClick={() => addSnackbar({ type: "success", msg: `Some testing` })}>
        Add Snack
      </button>

      <Modal
        className={`absolute left-1/2 top-1/2 h-fit -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-10 shadow-md`}
        setShow={setShowModal}
        show={showModal}>
        <h1 className="text-center text-xl">Modal</h1>

        <label htmlFor="username">Username</label>
        <input className="w-full rounded-md border" type="text" id="username" />

        <label htmlFor="password">Password</label>
        <input className="w-full rounded-md border" type="text" id="password" />
      </Modal>

      <SnackbarList className="pointer-events-none absolute bottom-0 z-40 grid h-72 w-72 content-end gap-2 p-5" />
    </main>
  )
}

export default App
