import React from 'react'
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';


const SimpleDialog = props => {

    const dialogTitle = {
        color: props.dialogTitleColor,
        fontSize: '14px',
        textAlign: 'center',
        marginTop: '10px',
        marginBottom: '5px',
        padding: '0',
    }

    const dialogBox = {
        width: props.dialogContentWidth,
        padding: props.dialogContentPadding
    }

    return (
        <div>
            <Dialog
                open={props.openDialog}
                keepMounted
                disableBackdropClick
                disableEscapeKeyDown
                onClose={props.handleCloseDialog}
                aria-labelledby="dialog"
                aria-describedby="dialog"
            >
                <h5 style={dialogTitle}>
                    {props.dialogTitle}
                </h5>
                <DialogContent style={dialogBox}>
                    {props.dialogContent}
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default SimpleDialog;


{/* <SimpleDialog
    openDialog={props.openACDeleteDialog}
    handleOpenDialog={() => props.handleOpenDialog('openACDeleteDialog')}
    handleCloseDialog={() => props.handleCloseDialog('openACDeleteDialog')}
    dialogContentWidth='500px'
    dialogContentPadding='0 20px 20px 20px'
    dialogTitleColor='#ef0c00'
    dialogTitle={'Are you sure?'}
    dialogContent={
        <div>
            <div
                style={{
                    color: '#253061',
                    border: 'solid 1px #DC2048',
                    borderRadius: '5px',
                    padding: '20px',
                    margin: '10px',
                    textAlign: 'center'
                }}>
                Once this Authorization Code is deleted,
                it cannot be undone. However, you can
                generate another one.
            </div>


            <div style={{ margin: '30px', textAlign: 'left' }}>
                <div style={{ fontSize: '10px' }}>Authorization Code</div>
                <div style={{ color: '#8934FF' }}>{props.acToDelete}</div>
            </div>

            <div style={{ textAlign: 'right' }}>
                <Button
                    style={{ color: '#253061' }}
                    onClick={() => props.handleCloseDialog('openACDeleteDialog')}
                >
                    Cancel
                </Button>

                <Button
                    variant="contained"
                    style={{ backgroundColor: "#DC2048", color: '#ffffff' }}
                    onClick={() => props.deleteAuthCode(props.acToDelete)}
                >
                    Delete
                </Button>
            </div>
        </div>
    }
/> */}