import "./SequenceTimeline.scss";
import { AiOutlineDelete } from "react-icons/ai";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const SequenceTimeline = ({ jobs = [], onRemoveJob, setJobs }) => {
  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(jobs, result.source.index, result.destination.index);

    setJobs(items);
  };

  return (
    <div className="sequence-timeline-component">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable" direction="horizontal">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              className="timeline-wrapper"
              //   style={getListStyle(snapshot.isDraggingOver)}
              {...provided.droppableProps}
            >
              {jobs.map((job, index) => (
                <Draggable key={job.id} draggableId={"" + job.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      className="timeline-item"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        ...provided.draggableProps.style,
                        width: job.width,
                      }}
                    >
                      <span className="item-label">{job.content}</span>
                      <span className="remove-icon">
                        <AiOutlineDelete onClick={() => onRemoveJob(job.id)} />
                      </span>
                    </div>
                  )}
                </Draggable>
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default SequenceTimeline;
