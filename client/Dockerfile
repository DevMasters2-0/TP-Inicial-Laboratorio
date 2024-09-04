# Usar una imagen base de Node.js
FROM node:22
# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app
# Copiar el package.json y package-lock.json (si existe)
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto de los archivos de la aplicación
COPY . .

# Exponer el puerto en el que corre la aplicación
EXPOSE 5173

# Comando para ejecutar la aplicación
CMD ["npm", "run", "staging"]
