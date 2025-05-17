import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EEEEEE',
    },
    
    margin:{
      margin: 20
    },

    p:{
      padding:20
    },

    header: {
        backgroundColor: '#BB0000',
        padding: 10,
        paddingTop: 50,
        paddingBottom: 40,
        flexDirection: 'row',
        alignItems: 'center',
    
      },
      headerTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
        flex:1,
        textAlign:'center'
        
      },

      headerIcon:{
        color: 'white',
        fontSize: 30,
        marginLeft: 10
      },

    logoContainer: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        margin:20,
        borderColor: '#BB0000',
        borderWidth:1,
      },

      logo: {
        width: 70,
        height: 70,
        marginRight: 10,
        borderRadius: 50,
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#BB0000',
        marginTop: 10,
      },
      subtitle: {
        fontSize: 16,
        color: '#757575',
      },
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 20,
      },
      button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        margin:10,
        borderRadius: 25,
      },
      registerButton: {
        backgroundColor: '#fff',
        borderColor: '#BB0000',
        borderWidth:1,
        fontSize: 16,
        fontWeight: 'bold',
      },
      loginButton: {
        backgroundColor: '#BB0000',
      },
      buttonText: {
        color: '#BB0000',
        fontSize: 16,
        fontWeight: 'bold',
      },

      buttonText2: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
      },

      featuresContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        paddingHorizontal: 10,
        
      },
      featureItem: {
        alignItems: 'center',
        width: '25%',
        marginVertical: 15,
      },
      iconCircle: {
        backgroundColor: '#DDDDDD',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#BB0000',
        borderWidth:1,
        color:'#BB0000',
        fontSize:30
      },
      featureText: {
        marginTop: 5,
        fontSize: 14,
        textAlign: 'center',
        color: '#424242',
      },
      bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#BB0000',
        backgroundColor: 'white',
        // paddingBottom:50,
        position: 'absolute', 
        bottom: 0,
        left: 0,
        right: 0,
      },
      navItem: {
        alignItems: 'center',
        
      },
      navText: {
        fontSize: 12,
        color: '#757575',
      },

      callIcon:{
        alignItems: 'center',
        padding: 20,
        paddingBottom:20,
        backgroundColor: '#BB0000',
        borderRadius: 50,
        borderColor: 'white',
        borderWidth:1,
        color:'white'
      },

    });