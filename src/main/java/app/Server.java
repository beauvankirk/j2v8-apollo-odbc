package com.ercot.app;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.InputStream;
import java.io.FileOutputStream;

import java.net.URL;
import java.net.URI;
import java.net.URISyntaxException;

import com.eclipsesource.v8.JavaCallback;
import com.eclipsesource.v8.NodeJS;
import com.eclipsesource.v8.V8;
import com.eclipsesource.v8.V8Array;
import com.eclipsesource.v8.V8Function;
import com.eclipsesource.v8.V8Object;

public class Server {

  private V8Object api;
  private V8Object renderedCallback;
  private V8Object v8jsonParser;

  private Thread executingThread;
	private static V8 v8;
	private static NodeJS nodeJS;
	public static void main(String[] args) throws IOException {
		// App obj = new App();
		// String fileName = "server.js";
		// final File file = obj.getFile("js/dist/server.js");

		// File file = new File(url.getFile());

		final NodeJS server = NodeJS.createNodeJS(new File("app-target/server/bundle.js"));
		// final V8Object importedScript = nodeJS.require(new File("/"));
		// importedScript.executeJSFunction("hello");

		while (server.isRunning()) {
			server.handleMessage();
		}
		server.release();
	}


	private String getFileURL(String fileName) {

		//Get file from resources folder
		ClassLoader classLoader = getClass().getClassLoader();
		String URL = classLoader.getResource(fileName).getFile();

		return URL;

	}
	private File getFile(String fileName) {


		ClassLoader classLoader = getClass().getClassLoader();
		URL url = classLoader.getResource(fileName);
		System.out.println("url = " + url);

    File file = new File(url.getFile());

		System.out.println("File Found : " + file.exists());

		return file;

	}

	public static File getResourceAsFile(String resourcePath) {
		try {
			InputStream in = ClassLoader.getSystemClassLoader().getResourceAsStream(resourcePath);
			if (in == null) {
				return null;
			}

			File tempFile = File.createTempFile(String.valueOf(in.hashCode()), ".tmp");
			tempFile.deleteOnExit();

			try (FileOutputStream out = new FileOutputStream(tempFile)) {
				//copy stream
				byte[] buffer = new byte[1024];
				int bytesRead;
				while ((bytesRead = in.read(buffer)) != -1) {
					out.write(buffer, 0, bytesRead);
				}
			}
			return tempFile;
		} catch (IOException e) {
			e.printStackTrace();
			return null;
		}
	}
	public static void oldmain(String[] args) throws IOException {
		nodeJS = NodeJS.createNodeJS();
		v8 = nodeJS.getRuntime();
		JSObject http = createHttpServer(nodeJS);

		JSObject server = http.execute(
		"createServer",
		f(
		(V8Object receiver, V8Array parameters) -> {
			JSObject response = jsObject((V8Object) parameters.get(1));
			V8Object params = o("Content-Type", "text/plain");
			response.execute("writeHead", 200, params);
			response.execute("end", "Hello, from the JavaWorld!");
			response.release();
			params.release();
			return null;
		}
		)
		);

		server.execute("listen", 8000);
		System.out.println("Node HTTP server listening on port 8000.");

		server.release();
		http.release();
		while (nodeJS.isRunning()) {
			nodeJS.handleMessage();
		}
		nodeJS.release();
	}

	private static JSObject createHttpServer(NodeJS node) throws IOException {
		V8Object exports = node.require(createTemporaryScriptFile("var http = require('http'); module.exports = {'http' : http};", "httpStartup"));
		try {
			return new JSObject((V8Object) exports.get("http"));
		} finally {
			exports.release();
		}
	}

	static class JSObject {
		private V8Object object;

		public JSObject(V8Object object) {
			this.object = object;
		}

		public JSObject execute(String function, Object... parameters) {
			Object result = object.executeJSFunction(function, parameters);
			if (result instanceof V8Object) {
				return new JSObject((V8Object) result);
			}
			return null;
		}

		@Override
		public String toString() {
			return object.toString();
		}

		public void release() {
			this.object.release();
			this.object = null;
		}
	}

	public static V8Function f(JavaCallback callback) {
		return new V8Function(v8, callback);
	}

	public static V8Object o(String k, String v) {
		return new V8Object(v8).add(k, v);
	}

	public static V8Object o(String k, int v) {
		return new V8Object(v8).add(k, v);
	}

	public static JSObject jsObject(V8Object object) {
		return new JSObject(object);
	}

	private static File createTemporaryScriptFile(final String script, final String name) throws IOException {
		File tempFile = File.createTempFile(name, ".js");
		PrintWriter writer = new PrintWriter(tempFile, "UTF-8");
		try {
			writer.print(script);
		} finally {
			writer.close();
		}
		return tempFile;
	}
}
