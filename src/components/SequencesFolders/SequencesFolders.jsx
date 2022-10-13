import ModalCreateFolder from "components/ModalCreateFolder/ModalCreateFolder";
import SequencesFoldersAccordion from "components/SequencesFoldersAccordion/SequencesFoldersAccordion";
import { useEffect, useState } from "react";
import {
  MdOutlineAssignment,
  MdFolderOpen,
  MdOutlineCreateNewFolder,
} from "react-icons/md";
import { useDispatch } from "react-redux";
import { Button } from "reactstrap";
import { useDeleteFoldersMutation } from "store/api/folders";
import { useCreateOrUpdateFolderMutation } from "store/api/folders";
import { useGetFoldersQuery } from "store/api/folders";
import { selectFolder } from "store/slices/sequencesSlice";
import "./SequencesFolders.scss";

const SequencesFolders = () => {
  const dispatch = useDispatch();
  const [folders, setFolders] = useState([]);
  const { data: foldersList, idFetching, isLoading } = useGetFoldersQuery();
  const [createOrUpdateFolder] = useCreateOrUpdateFolderMutation();
  const [deleteFolders] = useDeleteFoldersMutation();

  const [folderForModal, setFolderForModal] = useState(null);

  const onCreateOrUpdateFolder = (folder) => {
    setFolderForModal(null);
    createOrUpdateFolder(folder);
    if (folder.id) {
      setFolders((folders) =>
        folders.map((oldFolder) =>
          oldFolder.id === folder.id ? folder : oldFolder
        )
      );
    } else {
      setFolders((folders) => [{ ...folder, id: 99999 }, ...folders]);
    }
  };

  useEffect(() => {
    foldersList && setFolders(foldersList);
  }, [JSON.stringify(foldersList)]);

  const onEditFolder = (folder) => {
    setFolderForModal(folder);
  };

  const onDeleteFolder = () => {
    deleteFolders([folderForModal.id]);

    setFolders((folders) =>
      folders.filter((folder) => folder.id !== folderForModal.id)
    );

    setFolderForModal(null);
  };

  const onSelectFolder = (id) => {
    dispatch(selectFolder(id));
  };

  return (
    <>
      <div className="squences-folders-component">
        {folders && folders.length === 0 && (
          <div
            className="d-flex flex-column align-items-center p-1"
            style={{ opacity: 0.7 }}
          >
            <MdOutlineAssignment size="3rem" />
            <p className="text-center">
              Папки позволят Вам легко организовать последовательности
            </p>
            <Button
              className="d-flex align-items-center"
              color="info"
              outline
              onClick={() => setFolderForModal({})}
            >
              <MdFolderOpen size="1.5rem" className="mr-1" />
              Создать папку
            </Button>
          </div>
        )}

        {folders && folders.length > 0 && (
          <>
            <div
              className="d-flex align-items-center justify-content-between mb-4 create-folder"
              onClick={() => setFolderForModal({})}
            >
              Папки <MdOutlineCreateNewFolder size="1.75rem" />
            </div>
            <SequencesFoldersAccordion
              folders={folders}
              className="folders"
              onEdit={onEditFolder}
              onSelect={onSelectFolder}
            />
          </>
        )}
      </div>
      {folderForModal !== null && (
        <ModalCreateFolder
          isShow={true}
          folder={folderForModal}
          onDelete={onDeleteFolder}
          onClose={() => setFolderForModal(null)}
          onSubmit={onCreateOrUpdateFolder}
        />
      )}
    </>
  );
};

export default SequencesFolders;
