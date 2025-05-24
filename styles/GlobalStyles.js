// styles/GlobalStyles.js

import { StyleSheet } from 'react-native';

const GlobalStyles = StyleSheet.create({
  // Genel Kullanım
  container: {
    flex: 1,
    backgroundColor: '#fffbea',
    padding: 24,
    justifyContent: 'center',
  },
  header: {
  fontSize: 22,
  fontWeight: 'bold',
  color: '#222',
  textAlign: 'center',
  marginBottom: 16,
  },
  logo: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 32,
    letterSpacing: 1,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    borderWidth: 1.5,
    borderColor: '#222',
    marginBottom: 16,
  },
  textarea: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    borderWidth: 1.5,
    borderColor: '#222',
    height: 100,
    textAlignVertical: 'top',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#f5c518',
    padding: 14,
    borderRadius: 12,
    marginTop: 8,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 24,
  },
});

export default GlobalStyles;

export const taskStyles = StyleSheet.create({
  taskItem: {
    backgroundColor: '#fffbea',
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
    borderColor: '#222',
    borderWidth: 1,
  },
  taskCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderColor: '#222',
    borderWidth: 1.2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  taskDescription: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    width: '85%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    color: '#444',
    marginBottom: 10,
  },
  modalDate: {
    fontSize: 14,
    color: '#888',
    marginBottom: 20,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});
export const profileStyles = StyleSheet.create({
  brandBig: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#f5c518',
    marginBottom: 10,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 75,
    marginTop: 10,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginVertical: 20,
  },
  statBox: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 1, height: 1 },
    elevation: 3,
  },
  statValue: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#222',
  },
  statLabel: {
    fontSize: 16,
    color: '#333',
  },
  logoutBtnWide: {
    backgroundColor: '#222',
    paddingVertical: 14,
    paddingHorizontal: 60,
    borderRadius: 10,
  },
  logoutText: {
    color: '#f5c518',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});



