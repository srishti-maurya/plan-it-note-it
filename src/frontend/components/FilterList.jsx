import { useNotes } from "../context";

export function FilterList() {
  const { notesOrder, setNotesOrder } = useNotes();
  return (
    <div className="filter-list">
      <button
        onClick={() => setNotesOrder(() => ({ sort: "", filter: "" }))}
        className="btn btn-sm color-secondary-outline"
      >
        Clear
      </button>
      <h3 className="border-bottom margin-sm">Sort By</h3>
      <div onClick={(e) => e.stopPropagation()}>
        <h4 className="margin-sm">Date</h4>
        <label className="margin-right-sm">
          <input
            className="margin-right-sm"
            type="radio"
            name="sort-date"
            value="latest"
            checked={notesOrder.sort === "latest"}
            onChange={(e) =>
              setNotesOrder({ ...notesOrder, sort: e.target.value })
            }
          />
          Latest first
        </label>
        <label className="margin-right-sm">
          <input
            className="margin-right-sm"
            type="radio"
            name="sort-date"
            value="oldest"
            checked={notesOrder.sort === "oldest"}
            onChange={(e) =>
              setNotesOrder({ ...notesOrder, sort: e.target.value })
            }
          />
          Oldest first
        </label>
        <h4 className="margin-sm">Priority</h4>
        <label className="margin-right-sm">
          <input
            className="margin-right-sm"
            type="radio"
            name="sort-priority"
            value="lowToHigh"
            checked={notesOrder.sort === "lowToHigh"}
            onChange={(e) =>
              setNotesOrder({ ...notesOrder, sort: e.target.value })
            }
          />
          Low first
        </label>
        <label className="margin-right-sm">
          <input
            className="margin-right-sm"
            type="radio"
            name="sort-priority"
            value="highToLow"
            checked={notesOrder.sort === "highToLow"}
            onChange={(e) =>
              setNotesOrder({ ...notesOrder, sort: e.target.value })
            }
          />
          High first
        </label>
      </div>

      <h3 className="border-bottom margin-sm">Filter By</h3>

      <div onClick={(e) => e.stopPropagation()}>
        <h4 className="margin-sm">Priority</h4>
        <label className="margin-right-sm">
          <input
            className="margin-right-sm"
            type="radio"
            name="priority"
            value="1"
            checked={notesOrder.filter.Low === "1"}
            onChange={(e) => {
              setNotesOrder({
                ...notesOrder,
                filter: { Low: e.target.value },
              });
            }}
          />
          Low
        </label>
        <label className="margin-right-sm">
          <input
            className="margin-right-sm"
            type="radio"
            name="priority"
            value="2"
            checked={notesOrder.filter.Medium === "2"}
            onChange={(e) =>
              setNotesOrder({
                ...notesOrder,
                filter: { Medium: e.target.value },
              })
            }
          />
          Medium
        </label>
        <label className="margin-right-sm">
          <input
            className="margin-right-sm"
            type="radio"
            name="priority"
            value="3"
            checked={notesOrder.filter.High === "3"}
            onChange={(e) =>
              setNotesOrder({
                ...notesOrder,
                filter: { High: e.target.value },
              })
            }
          />
          High
        </label>
      </div>
    </div>
  );
}
