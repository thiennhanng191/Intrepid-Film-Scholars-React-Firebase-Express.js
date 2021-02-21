import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  html, body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text}; 
  }
  .MuiCard-root {
      color: ${({ theme }) => theme.text} !important;
      background-color: ${({ theme }) => theme.cardBackground} !important;
  }
  .MuiPaper-root {
    color: ${({ theme }) => theme.text} !important;
    background-color: ${({ theme }) => theme.cardBackground} !important;
}
  .MuiAppBar-colorPrimary {
      background-color: #016B73 !important;
  }

  #title-in-post-details .MuiTypography-root {
    color: white;
  }
  
  .MuiTypography-root {
    color: ${({ theme }) => theme.text};
  }
  
  #comment-form {
      background-color: ${({ theme }) => theme.textField};
  }
  #submit-icon {
      color: ${({ theme }) => theme.submitIcon};
  }
  #notification-icon {
    color: ${({ theme }) => theme.submitIcon} !important;
}
  #comment-card {
      background-color: ${({ theme }) => theme.commentCard} !important;
  }
  div::-webkit-scrollbar {
    width: 12px;               /* width of the entire scrollbar */
  }
  div::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.scrollBarBackground} ;        /* color of the tracking area */
  }
  div::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.scrollBarThumb};    /* color of the scroll thumb */
    border-radius: 20px;       /* roundness of the scroll thumb */
    border: 1.5px solid #01B2BF;  /* creates padding around scroll thumb */
  }
  #input-base {
      color: ${({ theme }) => theme.text};
  }
 
  .MuiInputBase-input {
    color: ${({ theme }) => theme.text} !important;
  }
  
  .MuiOutlinedInput-notchedOutline {
      border-color: ${({ theme }) => theme.muiNotchedOutline} !important;
  }

  /*
  #movies-tv-toggle .MuiToggleButton-root.Mui-selected {
    background-color: 
  }
  */

  #select-button.MuiInputLabel-outlined {
      color: ${({ theme }) => theme.muiInputLabelOutlined} !important;
  }
  .MuiSelect-outlined.MuiSelect-outlined {
      color: ${({ theme }) => theme.muiSelectOutlined} !important;
  }
  .MuiSelect-iconOutlined {
    color: ${({ theme }) => theme.muiInputLabelOutlined} !important;
  }
  .MuiOutlinedInput-multiline { /* styling upload post field */
    background-color: ${({ theme }) => theme.postForm} !important;
    border-radius: 10px !important;
    color: ${({ theme }) => theme.text} !important;
}
.MuiInputLabel-formControl { /* styling label textfield*/
  color: gray !important;
}
.MuiFormLabel-root.Mui-focused {
  color: ${({ theme }) => theme.textFieldLabelFocused} !important;
}
.MuiInput-underline:before {
  border-bottom: 1px solid gray !important; /* textField underline not on focus */
}
.MuiInput-underline:after { /* textField underline on focus */
  border-bottom: 2px solid ${({ theme }) => theme.textFieldLabelFocused} !important;
}
.MuiSelect-selectMenu {
  color: ${({ theme }) => theme.text} !important;
}
    /* styling for Chrome autocomplete form*/
    input:-webkit-autofill,
    input:-webkit-autofill:hover, 
    input:-webkit-autofill:focus, 
    input:-webkit-autofill:active  {
   -webkit-box-shadow: 0 0 0 30px ${({ theme }) => theme.cardBackground} inset !important;  /* change chrome autocomplete form's background color */
    background-clip: content-box;
    /* add padding to get rid of the unexpected outline */
    padding-right: 5px;
    padding-left: 5px;
  }
input:-webkit-autofill {
  -webkit-text-fill-color: ${({ theme }) => theme.text} !important; /* change chrome autocomplete form's text color */
}

#login-form input:-webkit-autofill,
#login-form input:-webkit-autofill:hover, 
#login-form input:-webkit-autofill:focus, 
#login-form input:-webkit-autofill:active  {
   -webkit-box-shadow: 0 0 0 30px ${({ theme }) => theme.body} inset !important;  /* change chrome autocomplete form's background color */
    background-clip: content-box;
    padding-left: 0px !important;
  }

#signup-form input:-webkit-autofill,
#signup-form input:-webkit-autofill:hover, 
#signup-form input:-webkit-autofill:focus, 
#signup-form input:-webkit-autofill:active  {
   -webkit-box-shadow: 0 0 0 30px ${({ theme }) => theme.body} inset !important;  /* change chrome autocomplete form's background color */
    background-clip: content-box;
    padding-left: 0px !important;
  }


#favorite-genres-submit-button {
  background-color: #01B2BF;
  color: #013C40;
}

.MuiPaginationItem-root {
    color: ${({ theme }) => theme.text} !important;
}

.MuiPaginationItem-page.Mui-selected {
  background-color: rgba(1, 178, 191, 0.3) !important; /* 01B2BF with alpha*/
}

.MuiAppBar-colorPrimary {
  background-color: ${({ theme }) => theme.appBar} !important;
}


.draftJsMentionPlugin__mentionSuggestions__2DWjA {
  background: ${({ theme }) => theme.mentionSuggestionsBackground} !important;
  box-shadow: ${({ theme }) => theme.mentionSuggestionsBoxShadow} !important;
  border: ${({ theme }) => theme.mentionSuggestionsBorder} !important;
}

.MuiTab-textColorPrimary {
  color: ${({ theme }) => theme.text} !important;
}
.MuiTab-textColorPrimary.Mui-selected {
  color: #01B2BF !important;
}
.MuiTabs-root {
  background-color:  ${({ theme }) => theme.cardBackground} !important;
}

#post-sort-select {
  background-color:  ${({ theme }) => theme.cardBackground};
}

#sort-post-bar-mobile {
  background-color:  ${({ theme }) => theme.cardBackground};
}

#post-date {
  color: ${({ theme }) => theme.dateText};
}

#expand-profile-menu-icon {
  color: ${({ theme }) => theme.text};
}

  `;