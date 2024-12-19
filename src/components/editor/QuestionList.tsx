import React from 'react';
import { Draggable, DroppableProvided } from 'react-beautiful-dnd';
import { GripVertical, Trash2 } from 'lucide-react';
import { Question } from '../../types/form';
import QuestionEditor from './QuestionEditor';

interface QuestionListProps {
  provided: DroppableProvided;
  questions: Question[];
  onUpdate: (questionId: string, updates: Partial<Question>) => void;
  onRemove: (questionId: string) => void;
}

export default function QuestionList({
  provided,
  questions,
  onUpdate,
  onRemove,
}: QuestionListProps) {
  return (
    <div {...provided.droppableProps} ref={provided.innerRef}>
      {questions.map((question, index) => (
        <Draggable key={question.id} draggableId={question.id} index={index}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              className="mb-4"
            >
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-4 mb-4">
                  <div {...provided.dragHandleProps}>
                    <GripVertical className="w-6 h-6 text-gray-400" />
                  </div>
                  <button
                    onClick={() => onRemove(question.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                <QuestionEditor
                  question={question}
                  onChange={(updates) => onUpdate(question.id, updates)}
                />
              </div>
            </div>
          )}
        </Draggable>
      ))}
      {provided.placeholder}
    </div>
  );
}