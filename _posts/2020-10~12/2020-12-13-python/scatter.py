import matplotlib.pyplot as plt
import numpy as np

points = np.random.normal(loc=[40, 60], scale=15, size=[200, 2])
plt.scatter(points.T[0], points.T[1], marker='o', label="A")


points = np.random.normal(loc=[80, 100], scale=12, size=[100, 2])
plt.scatter(points.T[0], points.T[1], marker='^', label="B")


points = np.random.normal(loc=[20, 110], scale=8, size=[30, 2])
plt.scatter(points.T[0], points.T[1], marker='d', label="C")


plt.show();
