import {
 
    GridRowModes,
    
    GridColDef,
    GridActionsCellItem,
 
  } from '@mui/x-data-grid';

  import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
  
const columns: GridColDef[] = [
  { field: 'candidateId', headerName: 'candidateId', width: 180, editable: true },
  { field: 'candidateName', headerName: 'candidateName', width: 180, editable: true },
  { field: 'candidateEmail', headerName: 'candidateEmail', width: 180, editable: true },
  { field: 'candidateContact', headerName: 'candidateContact', width: 180, editable: true },
  { field: 'technology', headerName: 'technology', width: 180, editable: true },
  { field: 'totalExperience', headerName: 'totalExperience', width: 180, editable: true },
  { field: 'currentCtc', headerName: 'currentCtc', width: 180, editable: true },
  { field: 'expectedCtc', headerName: 'expectedCtc', width: 180, editable: true },
  { field: 'noticePeriod', headerName: 'noticePeriod', width: 180, editable: true },
  { field: 'modeOfWork', headerName: 'modeOfWork', width: 180, editable: true },
  { field: 'currentLocation', headerName: 'currentLocation', width: 180, editable: true },
  { field: 'candidateStatus', headerName: 'candidateStatus', width: 180, editable: true },
  { field: 'comments', headerName: 'comments', width: 180, editable: true },
  { field: 'remarks', headerName: 'remarks', width: 180, editable: true },
  { field: 'recruiter', headerName: 'recruiter', width: 180, editable: true },
  { field: 'recruitedSource', headerName: 'recruitedSource', width: 180, editable: true },
  { field: 'createdDate', headerName: 'createdDate', width: 180, editable: true },
  {
    field: 'actions',
    type: 'actions',
    headerName: 'Actions',
    width: 100,
    cellClassName: 'actions',
    getActions: ({ id }) => {
    //   const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

      if (true) {
        return [
          <GridActionsCellItem
            key="first"
            icon={<SaveIcon />}
            label="Save"
            sx={{
              color: 'primary.main',
            }}
            onClick={handleSaveClick(id)}
          />,
          <GridActionsCellItem
            key="second"
            icon={<CancelIcon />}
            label="Cancel"
            className="textPrimary"
            onClick={handleCancelClick(id)}
            color="inherit"
          />,
        ];
      } else {
        return [
          <GridActionsCellItem
            key="third"
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            key="fourth"
            icon={<DeleteIcon />}
            label="Delete"
            // onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      }
    },
  },
];

export default columns;
