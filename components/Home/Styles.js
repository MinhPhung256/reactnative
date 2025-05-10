import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: '#fff' 
    },
  
    header: { 
        alignItems: 'center', 
        paddingVertical: 20, 
        backgroundColor: '#fff' 
    },


    logo: { 
        width: 70, 
        height: 70, 
        marginBottom: 10 
    },

    title: { 
        fontSize: 24, 
        fontWeight: 'bold', 
        color: '#2b57c6' 
    },

    subtitle: { 
        fontSize: 14, 
        color: '#555' 
    },
  
    authButtons: { 
        flexDirection: 'row', 
        marginTop: 15 
    },

    registerButton: {
      borderWidth: 1,
      borderColor: '#2b57c6',
      paddingVertical: 8,
      paddingHorizontal: 20,
      borderRadius: 5,
      marginRight: 10,
    },

    loginButton: {
      backgroundColor: '#2b57c6',
      paddingVertical: 8,
      paddingHorizontal: 20,
      borderRadius: 5,
    },

    registerText: { 
        color: '#2b57c6', 
        fontWeight: 'bold' 
    },

    loginText: { 
        color: '#fff', 
        fontWeight: 'bold' 
    },
  
    features: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      paddingVertical: 20,
    },

    featureItem: {
      alignItems: 'center',
      width: '30%',
      marginVertical: 15,
    },

    featureText: {
      textAlign: 'center',
      fontSize: 13,
      marginTop: 8,
      color: '#333',
    },
  
    tabBar: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingVertical: 12,
      borderTopWidth: 1,
      borderTopColor: '#ccc',
      backgroundColor: '#fff',
    },
    tabItem: { 
        alignItems: 'center' 
    },
    tabLabel: { 
        fontSize: 12, 
        marginTop: 4, 
        color: '#2b57c6' 
    },
  });